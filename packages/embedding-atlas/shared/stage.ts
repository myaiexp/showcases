// Shared Embedding Atlas stage: a sized view box, timers, Mosaic, full cleanup
//
// Traps found while building the gallery against embedding-atlas 0.26.0 (add to this list):
// - EmbeddingView and EmbeddingViewMosaic draw only through WebGPU, and they ask the adapter
//   for the `shader-f16` feature. Without both (Firefox without WebGPU, SwiftShader, older
//   Safari) the view shows "WebGPU is unavailable…" and draws nothing; labels, tooltips and
//   the rest of the DOM still mount. There is no WebGL fallback. Each view requests its own
//   GPU device on mount.
// - `width` and `height` are props, in CSS pixels; the view never measures its container.
//   Left out, they are 800 × 800. `pixelRatio` defaults to 2, `config.colorScheme` to light.
// - The docs' `Label` has `text`; 0.26's type has `content` (a string, or an image with a size).
//   Give every label a `level` (0 when there is only one): placement compares `level` with the
//   lowest and highest level present, and a label without one only shows in a narrow zoom band.
// - The docs' vanilla snippet puts `onTooltip` inside `data`; it is a top-level prop.
// - The plain EmbeddingView never searches its own points: with no `querySelection`, hover and
//   click pick nothing. EmbeddingViewMosaic looks rows up in SQL itself.
// - The plain view's `rangeSelection` is typed `Rectangle | null`, though its JSDoc (and the
//   view) also take a Point[] lasso; the Mosaic view's `rangeSelectionValue` is typed for both.
// - Automatic labels are cached (with `cache`) under a key built from the viewport and the
//   autoLabel settings, and `queryClusterLabels` gets clusters at two density bandwidths.
// - The algorithms docs call `umap.embedding()`; in 0.26 it is a property (a reused buffer).
//   `nn.queryByIndex(i, k)` lists i itself first, and k may exceed nNeighbors.
// - UMAP `seed` changes nothing under the default spectral initialisation; use
//   `initializeMethod: 'random'` to see it. `run()` anneals to epoch 500 (`nEpochs` moves
//   that); `step()` holds the learning rate flat, so step, then `run()` for a clean layout.
// - findClusters' `unionThreshold` is in the density map's own units, so the same value
//   merges more on a coarser grid. Cluster identifiers are not contiguous, and a cluster's
//   `boundary` can hold several polygons.
// - EmbeddingAtlas: the parallel-coordinates and embedding charts draw with WebGPU too; the
//   other charts are SVG. The `messages` renderer needs a real list of { role, content }:
//   a list of objects sent from JS through Arrow (`mosaic.table`) arrives garbled, so build
//   it in DuckDB (`STRUCT(role VARCHAR, content VARCHAR)[]`). columnStyles `display` "full"
//   and "badge" look the same in the instances table; only "hidden" changes it.
// - `coordinator.query()` resolves to a flechette Table: read rows with `.toArray()`
//   (shared/mosaic-kit.ts `rows`).
// - `update(props)` passes on only the props whose value changed by identity (`!==`), so a
//   mutated object or typed array is ignored: pass a new one.
// - `destroy()` on EmbeddingView leaves the target element in place (EmbeddingAtlas removes
//   its own shadow-root container); `stage.own()` destroys, then the stage removes its box.
// - The props named `viewportState`, `tooltip`, `selection` and `rangeSelection` are
//   controlled: the view reports changes through the `on…` callbacks, and passing a value
//   moves the view there.
// - Mosaic: `wasmConnector()` with no instance fetches DuckDB from jsDelivr, and DuckDB
//   autoloads extensions from extensions.duckdb.org. `shared/db.ts` hands every coordinator
//   the page's bundled DuckDB and turns autoloading off.
// - EmbeddingViewMosaic image labels need `identifier` as well as `image` and `importance`
//   (without it the view returns no image labels), and a region whose most important row
//   has a NULL image gets no label at all.
// - Destroying a view while it is still generating labels logs "Error while generating labels"
//   (a null densityMap) from the library; cards unmounting mid-label hit it, harmlessly.
// - Never use Mosaic's global `coordinator()` (EmbeddingViewMosaic's default when the
//   `coordinator` prop is left out): it would be shared by every card on the page.
import type { MountContext } from '@/types.ts';
import { createMosaic, type Mosaic } from './db.ts';

export interface StageOptions {
  /** One line under the view in the full view, such as "Scroll to zoom". */
  hint?: string;
  /** Full-view height of the view box (default 460). Cards are 200px tall. */
  height?: number;
  /** Full-view width cap (default 900). */
  maxWidth?: number;
  /**
   * Cards only: lay the view out at 1/cardZoom of the card's size and scale it down, so a
   * whole UI (EmbeddingAtlas) fits a 200px card as a miniature. Default 1.
   */
  cardZoom?: number;
}

export interface Destroyable {
  destroy(): void;
}

export interface Stage {
  preview: boolean;
  /** The element to construct the component in, sized `width` × `height` (before cardZoom). */
  view: HTMLDivElement;
  /** CSS pixels: pass as the component's `width` and `height` props. */
  width: number;
  height: number;
  /** Control bar under the view, or null in a card. */
  bar: HTMLElement | null;
  /** The outer column: view, hint, bar. Append extra full-view panels here. */
  box: HTMLDivElement;
  /** True once the stage is disposed: stop async work that finishes later. */
  readonly disposed: boolean;
  /** Destroys the component on dispose. */
  own<T extends Destroyable>(component: T): T;
  /** A Mosaic coordinator on the page's DuckDB, with tables dropped on dispose. */
  mosaic(): Promise<Mosaic>;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. */
  loop(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /**
   * Shows one of several variants at a time: `show(label, host)` builds it in a fresh host
   * inside the view and returns what to destroy. Cards step through the labels every `ms`;
   * the full view gets a select (named `label`) in the bar.
   */
  variants(label: string, labels: readonly string[], show: (label: string, host: HTMLDivElement) => Destroyable | Promise<Destroyable>, ms?: number): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%';
  el.append(box);

  const avail = el.clientWidth || (preview ? 280 : 720);
  const zoom = preview ? (opts.cardZoom ?? 1) : 1;
  const outerW = Math.floor(preview ? avail : Math.min(avail - 16, opts.maxWidth ?? 900));
  const outerH = preview ? 200 : (opts.height ?? 460);
  const width = Math.floor(outerW / zoom);
  const height = Math.floor(outerH / zoom);
  const frame = document.createElement('div');
  frame.style.cssText = `position:relative;width:${outerW}px;height:${outerH}px;flex:none;
    border-radius:${preview ? 0 : 6}px;overflow:hidden;background:#0b0d12`;
  const view = document.createElement('div');
  view.style.cssText = `position:absolute;left:0;top:0;width:${width}px;height:${height}px`;
  if (zoom !== 1) {
    view.style.transform = `scale(${zoom})`;
    view.style.transformOrigin = '0 0';
  }
  frame.append(view);
  box.append(frame);

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:13px;color:var(--fg-3)';
    hint.textContent = opts.hint;
    box.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.style.cssText =
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:900px';
    box.append(bar);
  }

  let raf = 0;
  const timers: number[] = [];
  const disposers: (() => void)[] = [];
  const owned: Destroyable[] = [];
  const mosaics: Mosaic[] = [];
  let disposed = false;

  const stage: Stage = {
    preview,
    view,
    width,
    height,
    bar,
    box,
    get disposed() {
      return disposed;
    },
    own(component) {
      if (disposed) component.destroy();
      else owned.push(component);
      return component;
    },
    async mosaic() {
      const m = await createMosaic();
      if (disposed) void m.dispose();
      else mosaics.push(m);
      return m;
    },
    loop(frame) {
      let last = performance.now();
      const start = last;
      const tick = (now: number): void => {
        if (disposed) return;
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        frame(dt, (now - start) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    every(ms, fn) {
      timers.push(window.setInterval(() => !disposed && fn(), ms));
    },
    after(ms, fn) {
      timers.push(window.setTimeout(() => !disposed && fn(), ms));
    },
    variants(label, labels, show, ms = 5000) {
      let current: Destroyable | null = null;
      let host: HTMLDivElement | null = null;
      let token = 0;
      const open = async (name: string): Promise<void> => {
        const mine = ++token;
        current?.destroy();
        host?.remove();
        current = null;
        host = document.createElement('div');
        host.style.cssText = 'position:absolute;inset:0';
        view.append(host);
        const made = await show(name, host);
        if (disposed || mine !== token) made.destroy();
        else current = made;
      };
      disposers.push(() => {
        token++;
        current?.destroy();
      });
      void open(labels[0]!);
      if (preview) {
        let i = 0;
        stage.every(ms, () => void open(labels[(i = (i + 1) % labels.length)]!));
      } else if (bar) {
        const wrap = document.createElement('label');
        wrap.style.cssText = 'display:flex;gap:6px;align-items:center;font-size:13px';
        const sel = document.createElement('select');
        for (const l of labels) sel.add(new Option(l, l));
        sel.addEventListener('change', () => void open(sel.value));
        wrap.append(label, sel);
        bar.append(wrap);
      }
    },
    onDispose(fn) {
      disposers.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      for (const t of timers) {
        clearInterval(t);
        clearTimeout(t);
      }
      for (const fn of disposers.splice(0)) fn();
      // Components first: they still hold Mosaic clients on the coordinator.
      for (const c of owned.splice(0)) {
        try {
          c.destroy();
        } catch (err) {
          console.error('embedding-atlas: destroy failed', err);
        }
      }
      for (const m of mosaics.splice(0)) void m.dispose();
      box.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}
