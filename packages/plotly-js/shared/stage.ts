// Shared Plotly stage: sized graph div, dark template, card loop, resize, teardown
import Plotly from 'plotly.js';
import type { Config, PlotlyHTMLElement, Template } from 'plotly.js';
import type { MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import { darkTemplate } from './theme.ts';
import './stage.css';

/**
 * plotly.js 4.3 traps found while building this gallery, for whoever adds the next example:
 * - vite.config.ts resolves `plotly.js` to dist/plotly.min.js (the docs' <script> bundle);
 *   types still come from lib/index.d.ts. Deep imports (dist/plotly-geo-assets.js, locales)
 *   resolve normally.
 * - Plotly parses colours itself: CSS var() strings fail. theme.ts reads base.css tokens
 *   into concrete colours once per mount.
 * - A template only fills what the figure leaves unset; an example that sets its own
 *   paper_bgcolor, font or margin wins over it, which is what template examples rely on.
 * - Plotly.Fx (hover, unhover) exists at runtime but is missing from the types: import the
 *   typed view from shared/fx.ts.
 * - Plotly.purge does not free WebGL contexts reliably (gl2d, 3D scenes, parcoords, splom):
 *   dispose() purges, then loses every canvas context the plot left, so cards that scroll
 *   past never exhaust the browser's ~16 live contexts.
 * - geo subplots fetch topojson from cdn.plot.ly unless window.PlotlyGeoAssets holds it:
 *   await shared/geo.ts loadGeoAssets() before Plotly.newPlot. Loading the assets bundle
 *   also overwrites window.Plotly; loadGeoAssets puts it back.
 * - Tile maps (map subplots) fetch styles, tiles and glyphs from the network: use
 *   shared/tiles.ts darkMapStyle() (a style object with no sources), draw land with its
 *   GeoJSON layers, and never ask for text on a map (glyphs need a URL).
 * - Cards have no pointer: animate with stage.every() (restyle, react, animate, Fx.hover).
 *   A card that calls none of them gets a periodic wipe so it still looks alive.
 * - v4 shows a "Share chart…" mode bar button that uploads the figure to Plotly Cloud;
 *   stage.config turns it off (showSendToCloud: false). Spread stage.config, never replace it.
 * - The bundled types are stricter than the docs: tuples ([null, 500] ranges, domains),
 *   per-trace arrays in restyle ({opacity: [a, b]}), `as const` readonly arrays and reading
 *   a trace back (Data is a union) all need casts; basic-util.ts has loosely typed
 *   restyle/relayout. Missing from the types though documented: prependTraces' maxPoints,
 *   sunburst textposition, Fx, `_guiRelayout`; violin points 'none' types only as false.
 * - Docs colour names with spaces ('deep sky blue') are not colours: write deepskyblue.
 * - uirevision only keeps changes the reader made; a scripted zoom through plain relayout
 *   is forgotten on the next react. fund-util.ts guiRelayout (Plotly._guiRelayout) records
 *   it the way the mode bar does.
 * - Config is read at newPlot: changing displayModeBar, staticPlot, locale, editable or
 *   scrollZoom means calling newPlot again. config.responsive listens to window resizes
 *   only (the stage's ResizeObserver covers its own box).
 * - A splom costs ~350MB in a software-WebGL browser (released on dispose): keep card
 *   sploms to a few dimensions and a sample of the rows.
 * - Docs values that are not schema values: textposition 'top'/'bottom' (write 'top center'),
 *   layout.orientation on polar plots (use polar.angularaxis.rotation), layout.marker.
 * - Carpet x/y and contourcarpet z grids are indexed [b][a]: rows follow b, columns a.
 * - Tile maps: scattermap.cluster counts and `below: 'water'`-style layer ids need a hosted
 *   style (glyphs, named layers); on darkMapStyle use below: 'traces' and no clusters.
 * - A plotly_relayout handler that adds shapes or annotations fires itself again: act only
 *   on axis keys (xaxis.range[0], xaxis.autorange). plotly_afterplot fires after them too.
 * - A dragged 3D camera reports `scene.camera` (whole object); a scripted relayout of
 *   `scene2.camera.eye` reports that narrower key, so syncing two scenes does not loop.
 * - Mount is async: await Plotly.newPlot, then check ctx.signal before starting loops.
 */

export interface StageOptions {
  /** Graph height in the full view, CSS pixels. Default 480. */
  height?: number;
  /** Graph height in a card. Default 200 (the whole card). */
  previewHeight?: number;
}

export interface Stage {
  /** The graph div every Plotly call takes. */
  readonly div: PlotlyHTMLElement & HTMLDivElement;
  readonly preview: boolean;
  /** Dark layout template; pass it as layout.template. */
  readonly template: Template;
  /** Base config: no Plotly logo; cards drop the mode bar. Spread it into an example's config. */
  readonly config: Partial<Config>;
  /** Control bar above the graph in the full view; null in cards. */
  readonly bar: HTMLElement | null;
  /**
   * Calls fn(i) every ms (i counts from 1) until the stage is disposed, in cards and the
   * full view alike: a loop that only keeps a card alive goes behind `if (stage.preview)`,
   * so it never fights the full view's controls.
   */
  every(ms: number, fn: (i: number) => void): void;
  /** Registers a teardown that runs before the plot is purged. */
  own(fn: () => void): void;
  /** Purges the plot, frees its WebGL contexts and removes everything the stage added. */
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const bar = preview ? null : controlBar(el);
  const div = document.createElement('div') as unknown as PlotlyHTMLElement & HTMLDivElement;
  div.className = preview ? 'pl-graph pl-graph-card' : 'pl-graph';
  div.style.height = `${preview ? (opts.previewHeight ?? 200) : (opts.height ?? 480)}px`;
  el.append(div);

  const stops: (() => void)[] = [];
  let animated = false;
  let disposed = false;

  const every = (ms: number, fn: (i: number) => void): void => {
    animated = true;
    let i = 0;
    const timer = setInterval(() => {
      if (!disposed) fn(++i);
    }, ms);
    stops.push(() => clearInterval(timer));
  };

  // A card whose example never animates gets a slow wipe, started once the first frame
  // has had time to draw.
  if (preview) {
    const first = setTimeout(() => {
      if (animated || disposed) return;
      const wipe = (): void => {
        div.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
          duration: 1400,
          easing: 'cubic-bezier(.3,.7,.3,1)',
        });
      };
      wipe();
      const timer = setInterval(wipe, 4800);
      stops.push(() => clearInterval(timer));
    }, 400);
    stops.push(() => clearTimeout(first));
  } else {
    // The graph follows its box: Plots.resize re-reads the div's size (autosize).
    let frame = 0;
    let lastWidth = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = div.clientWidth;
        if (Math.abs(w - lastWidth) < 4 || !('_fullLayout' in div)) return;
        lastWidth = w;
        // Typed void, but it returns a promise that rejects once the plot is purged.
        Promise.resolve(Plotly.Plots.resize(div) as unknown).catch(() => {});
      });
    });
    ro.observe(div);
    stops.push(() => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    });
  }

  return {
    div,
    preview,
    template: darkTemplate(preview),
    // showSendToCloud: v4's "Share chart…" button posts the figure to Plotly Cloud; never here.
    config: preview
      ? { displayModeBar: false, displaylogo: false, scrollZoom: false, showSendToCloud: false }
      : { displaylogo: false, showSendToCloud: false },
    bar,
    every,
    own: (fn) => stops.push(fn),
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const stop of stops.splice(0)) {
        try {
          stop();
        } catch (err) {
          console.error('plotly-js stage: a teardown failed', err);
        }
      }
      const canvases = [...div.querySelectorAll('canvas')];
      Plotly.purge(div);
      for (const canvas of canvases) loseContext(canvas);
      div.remove();
      bar?.remove();
    },
  };
}

/** Frees a canvas's WebGL context, if it has one. */
function loseContext(canvas: HTMLCanvasElement): void {
  // Asking for '2d' first: it returns null only when the canvas already holds a WebGL
  // context, and asking for 'webgl' on a bare canvas would create one just to lose it.
  if (canvas.getContext('2d')) return;
  for (const kind of ['webgl2', 'webgl', 'experimental-webgl'] as const) {
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext(kind) as WebGLRenderingContext | null;
    } catch {
      gl = null; // a canvas already bound to another context type throws in some browsers
    }
    if (gl) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return;
    }
  }
}
