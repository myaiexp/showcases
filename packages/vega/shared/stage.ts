// Shared Vega stage: dark config, offline loader, card fit, loops, teardown
import * as vega from 'vega';
import type { Config, Loader, Spec, View, ViewOptions } from 'vega';
import type { MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import { createGhost, type Ghost } from './ghost.ts';
import { offlineLoader } from './loader.ts';
import { darkConfig } from './theme.ts';
import './stage.css';

/**
 * Vega 6.4 traps found while building this gallery, for whoever adds the next example:
 * - Parse with stage.config (`vega.parse(spec, stage.config)`): Vega's defaults draw text,
 *   rules and guide labels black, invisible on the dark page. A spec's own `config` and
 *   explicit colours still win over it. Docs specs that hard-code "black" or "white" text
 *   or strokes need a page colour instead.
 * - Build views with `...stage.options` (container, bind, loader). The loader answers the
 *   docs' `"url": "data/…"` from the vendored files and refuses any remote URL, image marks
 *   included: draw images in code as data: URLs.
 * - Signal bindings go to stage.options.bind: a row under the view in the full view, a
 *   detached element in cards (no inputs in a 200px card).
 * - Cards have no pointer. Animate with stage.every() (view.signal(...).runAsync(), view.change
 *   for data), or fake input with stage.ghost(view), which needs the canvas renderer.
 * - The stage scales the view to fit (cards and narrow full views). Vega maps pointer
 *   coordinates through CSS transforms, so interaction keeps working when scaled.
 * - A ghost click in a card would bubble into the card's <a> and open the example; the stage
 *   cancels untrusted clicks at its frame. Specs that need the default action of a ghost click
 *   (none so far) can't have it in cards.
 * - `view.finalize()` removes the listeners a spec added to window or document; the stage
 *   calls it for every view it rendered or adopted.
 * - test/vega-examples.test.ts mounts every example headlessly and fails on Vega warnings.
 *   Async or signal-driven `url` data is empty on the first pass, so a domain read from it
 *   warns "Infinite extent": give those scales a fixed domain.
 * - x()/y() in event handlers are already relative to the data rectangle (vega-view
 *   subtracts padding and the autosize origin); don't subtract padding again.
 * - Nested arrays of signals (`extent: [[{signal}, …], …]`, clipExtent, voronoi extent) are
 *   ignored or throw; give the whole array as one signal expression. Flat arrays are fine.
 * - Read at parse time, so a signal there does nothing: scale `interpolate` (throws), legend
 *   `direction` and `type`, every config setting. Re-render to show another value.
 * - Docs claims wrong for 6.4: a mark-level `transform` cannot `filter` (throws); a `cross`
 *   filter cannot read signals; regression `order` is the degree (order + 1 coefficients);
 *   countpattern's default pattern is [\w"]+; there is no `endsWith` expression function.
 * - crossfilter output only feeds resolvefilter (its rows are indices): bin before the
 *   crossfilter, aggregate after; resolvefilter `ignore` from a signal returns stale rows.
 * - geoshape's `field` is read from the scenegraph item: write `datum.geo`, not `geo`.
 * - x and x2 (or y and y2) split across enter and update collapse a rect without a warning.
 *   A group sized only through `encode` has no width signal for its own `range: 'width'`.
 * - The Spec types lag the docs in places (signal-valued axis booleans and format.type, CSV
 *   string values, layout `center`, bind min/max on number inputs): cast only that fragment.
 * - tsconfig has noUncheckedIndexedAccess: guard indexed reads in card loops.
 */

export interface StageOptions {
  /** Renderer for stage.render(); default 'canvas'. */
  renderer?: 'canvas' | 'svg' | 'none';
  /** Largest card scale-up for a small view. Default 1.4. */
  maxCardScale?: number;
}

export interface RenderOptions {
  renderer?: 'canvas' | 'svg' | 'none';
  /** Enables hover encode sets; default true. */
  hover?: boolean;
  /** Extra View constructor options (tooltip, locale, expr, logLevel). */
  view?: Partial<ViewOptions> & Record<string, unknown>;
}

export interface Stage {
  readonly preview: boolean;
  /** The dark theme config: the second argument of vega.parse. */
  readonly config: Config;
  /** The offline data loader every view must get at construction. */
  readonly loader: Loader;
  /** View constructor options every view spreads: container, bind container and loader. */
  readonly options: { container: HTMLElement; bind: HTMLElement; loader: Loader };
  /** The control bar above the view in the full view; null in cards. Hidden while empty. */
  readonly bar: HTMLElement | null;
  /** Parses the spec with the dark config, builds a View on the stage and runs it. */
  render(spec: Spec, opts?: RenderOptions): Promise<View>;
  /** Hands a View built by the example to the stage, which fits it and finalizes it on dispose. */
  adopt(view: View): View;
  /** A synthetic pointer on a canvas-rendered view, for cards. */
  ghost(view: View): Ghost;
  /** Calls fn(i) every ms (i from 1) until disposed; a loop only for cards goes behind `if (stage.preview)`. */
  every(ms: number, fn: (i: number) => void | Promise<void>): void;
  /** Registers a teardown that runs before the views are finalized. */
  own(fn: () => void): void;
  readonly disposed: boolean;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const bar = preview ? null : controlBar(el);
  const frame = document.createElement('div');
  frame.className = 'vg-frame';
  const host = document.createElement('div');
  host.className = 'vg-view';
  frame.append(host);
  el.append(frame);
  const bind = document.createElement('div');
  bind.className = 'vg-bindings';
  if (!preview) el.append(bind);

  const loader = offlineLoader();
  const views: View[] = [];
  const stops: (() => void)[] = [];
  let animated = false;
  let disposed = false;
  let ghostGuard: ((e: Event) => void) | null = null;

  // Scale the view's natural size into the space it has. Cards may scale a small view up.
  const fit = (): void => {
    const w = host.offsetWidth;
    const h = host.offsetHeight;
    if (!w || !h) return;
    const availW = el.clientWidth || w;
    const s = preview
      ? Math.min(opts.maxCardScale ?? 1.4, (availW - 6) / w, 194 / h)
      : Math.min(1, availW / w);
    host.style.transform = s === 1 ? '' : `scale(${s})`;
    frame.style.width = `${Math.floor(w * s)}px`;
    frame.style.height = `${Math.ceil(h * s)}px`;
  };
  const ro = new ResizeObserver(() => fit());
  ro.observe(host);
  ro.observe(el);
  stops.push(() => ro.disconnect());

  const every = (ms: number, fn: (i: number) => void | Promise<void>): void => {
    animated = true;
    let i = 0;
    const timer = setInterval(() => {
      if (disposed) return;
      Promise.resolve(fn(++i)).catch((err: unknown) => {
        if (!disposed) console.error('vega stage: a timed step failed', err);
      });
    }, ms);
    stops.push(() => clearInterval(timer));
  };

  // A card whose example never animates gets a slow wipe once its first frame is drawn.
  if (preview) {
    const first = setTimeout(() => {
      if (animated || disposed) return;
      const wipe = (): void => {
        frame.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
          duration: 1400,
          easing: 'cubic-bezier(.3,.7,.3,1)',
        });
      };
      wipe();
      const timer = setInterval(wipe, 4800);
      stops.push(() => clearInterval(timer));
    }, 600);
    stops.push(() => clearTimeout(first));
  }

  const adopt = (view: View): View => {
    views.push(view);
    if (disposed) view.finalize();
    return view;
  };

  const stage: Stage = {
    preview,
    config: darkConfig(),
    loader,
    options: { container: host, bind, loader },
    bar,
    async render(spec, ro = {}) {
      const runtime = vega.parse(spec, stage.config);
      const view = adopt(
        new vega.View(runtime, {
          ...stage.options,
          renderer: ro.renderer ?? opts.renderer ?? 'canvas',
          hover: ro.hover ?? true,
          logLevel: vega.Warn,
          ...ro.view,
        } as ViewOptions),
      );
      await view.runAsync();
      fit();
      return view;
    },
    adopt,
    ghost: (view) => {
      animated = true;
      if (!ghostGuard) {
        // A card is an <a>: a synthetic click bubbling through it would open the example.
        // Cancelling the default stops that and still lets Vega's own listeners see the click.
        ghostGuard = (e: Event) => {
          if (!e.isTrusted) e.preventDefault();
        };
        for (const type of ['click', 'dblclick', 'auxclick']) frame.addEventListener(type, ghostGuard);
      }
      return createGhost(view, () => !disposed);
    },
    every,
    own: (fn) => stops.push(fn),
    get disposed() {
      return disposed;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const stop of stops.splice(0)) {
        try {
          stop();
        } catch (err) {
          console.error('vega stage: a teardown failed', err);
        }
      }
      for (const view of views.splice(0)) view.finalize();
      frame.remove();
      bind.remove();
      bar?.remove();
    },
  };
  return stage;
}
