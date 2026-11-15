// Shared TanStack Charts stage: chart box, controls, card loop, ghost pointer
//
// Traps found while building the gallery (add to this list):
// - Charts draw text, axes and grids in currentColor and the default palette from the six
//   --ts-chart-N custom properties: the stage box sets both (stage.css), so leave `theme` out
//   unless the example is about themes.
// - Every chart goes through `stage.own(mountChart(stage.box, {...}))`, so `host.destroy()` runs
//   on unmount (it removes observers, listeners, tooltips and markup).
// - Several charts share one document: a chart with gradients, clips or other SVG resources needs
//   `idPrefix: stage.id()`, or two cards emit the same resource ids.
// - The DOM host listens for pointer events on the container itself. Cards fake input with
//   `stage.ghost(...)`, which dispatches non-bubbling PointerEvents on that container only.
// - A mark-level canvas renderer (`renderer: canvasChartRenderer`) gives the host root
//   `height: 100%`, and the stage box has no height of its own, so the chart collapses to 0px:
//   set `stage.box.style.height = \`${stage.height}px\`` in that example.
// - `onRender` fires inside `mountChart`, before `const host = …` is assigned: read the
//   callback's own `scene`, never `host`, there.
// - `scene.scales.x` / `.y` are typed as possibly undefined: `scene.scales.x?.invert`.
// - The grammar page's `tickRotate` and `labelOffset` do not exist in 1.5.0: use
//   `axis.tickLabels.rotate` and `axis.label.offset`.
// - Gradient ids written as `url(#id)` are scoped by `idPrefix` automatically: pass
//   `idPrefix: stage.id()` and keep the id itself unprefixed.
// - `tooltip: true` does not type-check: import `tooltip` from `@tanstack/charts/tooltip`.
// - dodgeY/dodgeX need the dodged axis off (`y: null` / `x: null` in `scales`); waffles need
//   `scales: { x: null, y: null }`.
// - Colour legends go in the top-level `color: { legend: colorLegend() }`; a continuous colour
//   scale is a d3 `scaleLinear` factory plus `color.range`.
// - violinY takes `d3AreaXCurve`; violinX and ridgelines take `d3Curve`. A ridgeline's
//   `overlap` should not exceed the point scale's `padding`; `reverse: true` puts the first
//   category at the bottom.
// - differenceY on a log y works only when both scales invert (d3 `scaleLog` does).
// - A position scale ignores a `domain` key (`{ scale: scaleLinear, domain: [0, 10] }` type-checks
//   and does nothing): fix a domain on an instance, `scale: scaleLinear().domain([0, 10])`. The
//   `color` block's `domain` is real.
// - Facets with shared outer axes throw "cannot share outer axes" unless every cell resolves the
//   same scales (fixed equal domains); the parent needs `scales: { x: null, y: null }`, and child
//   specs are plain `{ marks, scales }` objects, not defineChart results.
// - The default tooltip prints raw x/y, which means pixels for Sankey, lon/lat for geo and angle/
//   radius for polar: give those `tooltip: { use: tooltip, format: (point) => … }`.
// - polar() text and rule marks go through the polar scales: a labelled pie needs angle
//   [0, 2π] and radius [0, 1], or `angle: null, radius: null`.
// - sankeyDiagram's links need `d3Curve(curveBumpX)` for S-shaped ribbons.
// - A first visit to a new subpath (polar, hierarchy/*, spatial/*) makes Vite re-optimise and
//   reload the dev page: a blank chart for a while is that, not a bug.
import type { MountContext } from '@/types.ts';
import './stage.css';

export interface StageOptions {
  /** Chart height in the full view (default 380). */
  height?: number;
  /** One line under the chart in the full view, such as "Hover a bar". */
  hint?: string;
}

/** Anything with a destroy(): a ChartHost, a canvas host, a controller. */
export interface Destroyable {
  destroy(): void;
}

export interface Stage {
  /** The first chart container: pass it to mountChart. */
  box: HTMLElement;
  /** Whole example area: append extra panes here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the chart, or null in a card. */
  bar: HTMLElement | null;
  /** Chart height to pass to the host: the card's height in a card, `opts.height` in full view. */
  height: number;
  /** Fires when the stage is disposed. */
  signal: AbortSignal;
  readonly disposed: boolean;
  /** A unique idPrefix for this mount (gradients, clips and other SVG resources). */
  id(name?: string): string;
  /** Destroys `thing` on dispose; returns it. */
  own<T extends Destroyable>(thing: T): T;
  /** Another chart container, placed in a row beside the first (small multiples, linked views). */
  addBox(): HTMLElement;
  /** Sets the plain-English line under the chart. */
  say(text: string): void;
  /** A monospace panel under the chart for values the example reads back. */
  readout(): HTMLPreElement;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /**
   * Shows `items` one by one: in a card every `ms` for ever, in the full view once (the
   * first item) unless `loop` is set. Returns a function that shows item `i`.
   */
  cycle<T>(items: readonly T[], ms: number, show: (item: T, i: number) => void, loop?: boolean): (i: number) => void;
  /**
   * Moves a pretend mouse over `target` (default: the first box), so focus, tooltips and
   * cursors react in a card. `path` maps t in [0, 1) to fractions of the target's width and
   * height. Events do not bubble, so no other card sees them.
   */
  ghost(path?: (t: number) => readonly [number, number], periodMs?: number, target?: HTMLElement): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

let mounts = 0;

/** A back-and-forth sweep across the middle: the default ghost path. */
export const sweep = (y = 0.5) => (t: number): readonly [number, number] => [0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2), y];

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const n = ++mounts;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'tc-wrap tc-card' : 'tc-wrap tc-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'tc-bar';
    wrap.append(bar);
  }
  const row = document.createElement('div');
  row.className = 'tc-row';
  const box = document.createElement('div');
  box.className = 'tc-box';
  row.append(box);
  const caption = document.createElement('div');
  caption.className = 'tc-caption';
  wrap.append(row, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'tc-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  const stage: Stage = {
    box,
    root: wrap,
    preview,
    bar,
    height: preview ? 196 : (opts.height ?? 380),
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    id(name = 'c') {
      return `tc${n}-${name}-`;
    },
    own(thing) {
      cleanups.push(() => thing.destroy());
      return thing;
    },
    addBox() {
      const extra = document.createElement('div');
      extra.className = 'tc-box';
      row.append(extra);
      return extra;
    },
    say(text) {
      caption.textContent = text;
    },
    readout() {
      const pre = document.createElement('pre');
      pre.className = 'tc-readout';
      wrap.insertBefore(pre, caption.nextSibling);
      return pre;
    },
    every(ms, fn) {
      if (stage.disposed) return;
      const id = setInterval(() => {
        if (!stage.disposed) fn();
      }, ms);
      intervals.add(id);
    },
    after(ms, fn) {
      if (stage.disposed) return;
      const id = setTimeout(() => {
        timers.delete(id);
        if (!stage.disposed) fn();
      }, ms);
      timers.add(id);
    },
    cycle(items, ms, show, loop = preview) {
      let i = 0;
      const at = (k: number): void => {
        i = ((k % items.length) + items.length) % items.length;
        show(items[i]!, i);
      };
      at(0);
      if (loop && items.length > 1) stage.every(ms, () => at(i + 1));
      return at;
    },
    ghost(path = sweep(), periodMs = 6000, target = box) {
      const start = performance.now();
      const fire = (type: string): void => {
        const r = target.getBoundingClientRect();
        if (!r.width) return;
        const [fx, fy] = path(((performance.now() - start) % periodMs) / periodMs);
        target.dispatchEvent(
          new PointerEvent(type, {
            clientX: r.left + fx * r.width,
            clientY: r.top + fy * r.height,
            pointerType: 'mouse',
            pointerId: 1,
            isPrimary: true,
            bubbles: false,
          }),
        );
      };
      stage.after(300, () => {
        fire('pointerenter');
        stage.every(70, () => fire('pointermove'));
      });
    },
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      for (const id of timers) clearTimeout(id);
      for (const id of intervals) clearInterval(id);
      timers.clear();
      intervals.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('tanstack-charts stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
