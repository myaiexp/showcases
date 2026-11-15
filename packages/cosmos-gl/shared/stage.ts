// Shared cosmos.gl stage: graph box, own GPU device, caption, controls
//
// Traps found while building the gallery (add to this list):
// - Graph.destroy() destroys the luma.gl device it made, but luma's device.destroy() never
//   loses the WebGL context. Chrome keeps about 16 live contexts and then drops the oldest,
//   which blanks other cards. So every example passes the documented third constructor
//   argument, `stage.device()`, a device the stage creates on its own canvas and frees on
//   cleanup (graph first, then device, then WEBGL_lose_context).
// - cosmos.gl 3.6 declares luma.gl ~9.3 as a peer, but luma.gl throws when two versions load
//   on one page, and deck.gl's gallery pins 9.4.2. cosmos.gl runs on that one copy.
// - spaceSize is deprecated but still places the origin: gravity pulls toward (2048, 2048) at
//   the default 4096. shared/data.ts centres every layout there (`CENTER`), so positions need
//   no rescale and the force layout starts from where the data says.
// - Data arrays are kept by reference: change one, pass it to its setter again, then render().
// - Cards have no pointer. cosmos.gl reads pointer events off its canvas, so shared/ghost.ts
//   dispatches them there (with a visible dot): hover, click and context-menu callbacks fire
//   as with a mouse. Drags and wheel zoom go through d3 and are not faked: drive those with
//   the matching API (zoom, setPinnedPoints, …) on a timer.
// - fitViewOnInit fits once, at fitViewDelay, to the positions at that moment. A layout that
//   then spreads or shrinks leaves the frame: cards call stage.refit(graph), full views can
//   call graph.fitView() later. With rescalePositions, tiny input spreads over the space first.
// - getPointPositions() and ghost.toPoint() read back from the GPU and stall it: fine on a
//   timer, never every frame.
// - Settings read only at construction (randomSeed, attribution) need a new Graph: build it with
//   shared/rebuild.ts, which reuses one stage device (Graph.destroy() leaves an external device
//   alone) and so never opens another WebGL context. Call fitView() on the rebuilt graph.
// - setConfig() puts every omitted key back to its default, enableSimulation (true) included: a
//   graph that was static starts relaxing. Use setConfigPartial() for live changes.
// - A NaN in a per-point or per-link array (colors, sizes, shapes, stroke widths) means "use the
//   config default"; the library resolves it at draw time. Headless software GL draws few frames,
//   so a 700 ms transition can still look half done in a screenshot.
// - Hover, click and context-menu picking go to a point first: a point's pick area is wider than
//   it is drawn, so a link between two close points can never be hit. Link examples use a sparse,
//   fixed layout (static-layouts.ts `web`) and cards aim the ghost at the middle of long links.
// - d3-zoom keeps its transform on the canvas element, and a rebuilt graph reuses the device's
//   canvas, so it starts from the previous graph's pan: call shared/reset-zoom.ts before build().
// - spaceToScreenRadius converts a point radius, not a world distance: it ignores the zoom unless
//   scalePointsOnZoom is on. enableZoom: false only blocks wheel, double-click and pinch; dragging
//   still pans, and zoom()/fitView() still work.
// - The per-call `enableSimulation` argument defaults to true for fitView, fitViewBy* and
//   zoomToPointByIndex (the docs are right), but setZoomLevel()/zoom() pass nothing and follow the
//   enableSimulationDuringZoom config. Wheel zoom (userDriven) always follows the config.
// - fitViewByPointPositions takes a plain number[], not a Float32Array, in the type definitions.
// - Cards fake a mouse drag with shared/fake-drag.ts (mousedown on the canvas, then window moves),
//   and the held right button with shared/right-hold.ts (pointermove with buttons = 2).
// - A position transition needs a first render behind it (the first render snaps), so examples that
//   move points wait for `await graph.ready` before the second setPointPositions + render(). With
//   the simulation running that second render also auto-pauses it, and a point-count change under
//   transitionDuration > 0 does too: growing graphs set transitionDuration: 0.
// - NaN-position (absent) points are left out of fitView and the init fit: a graph that starts with
//   empty slots frames only the filled ones, so use fitViewOnInit: false and fitViewByPointPositions.
// - findPointsInRect/Polygon, getSampledLinkPositionsMap and getTrackedPointPositionsArray read
//   synchronously (no nonBlocking form for the last two): call them on a timer, not every frame.
// - enableDrag defaults to false, so a host-driven drag needs no switch-off, but enableZoom must be
//   false or the same drag pans the view. A headless Graph (`new Graph(null, …)`) still needs the
//   stage device; its view-dependent calls (fitView, zoom) do nothing, so draw it on a plain 2D canvas.
// - showFPSMonitor keeps the render loop running (it never idles). To see on-demand rendering, count
//   `device.beginRenderPass` calls on the example's own device (and put it back on cleanup).
// - Headless Chrome (SwiftShader) is slow enough that the gallery benches most cards; check a
//   card by importing its main.ts and mounting it with { preview: true } by hand.
import type { Device } from '@luma.gl/core';
import { luma } from '@luma.gl/core';
import { webgl2Adapter } from '@luma.gl/webgl';
import type { Graph } from '@cosmos.gl/graph';
import type { MountContext } from '@/types.ts';
import { addButton, addSelect, addSlider, addToggle, type SelectOption } from './controls.ts';
import './stage.css';

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface StageOptions {
  /** One line under the graph in the full view, such as "Drag a point". */
  hint?: string;
  /** Graph height in the full view, px. Cards are always 200px. */
  height?: number;
  /** Background of the box behind the canvas (match the graph's backgroundColor). */
  background?: string;
}

export interface Stage {
  /** The div to hand `new Graph()`: the graph puts its canvas inside it. */
  div: HTMLDivElement;
  /** Scene row the graph sits in; append side panels here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  signal: AbortSignal;
  readonly disposed: boolean;
  /**
   * A luma.gl WebGL2 device on a fresh canvas, for `new Graph(div, config, stage.device())`.
   * The stage destroys it and loses its context on cleanup, after the graphs.
   */
  device(): Promise<Device>;
  /**
   * Cards only: re-frames `graph` with fitView every `ms` while its layout spreads, so a
   * 200px card keeps the whole graph in view. Does nothing in the full view.
   */
  refit(graph: Pick<Graph, 'fitView'>, ms?: number): void;
  /** Destroys `graph` on cleanup. Returns `graph`. */
  own<G extends Pick<Graph, 'destroy'>>(graph: G): G;
  /** Sets the plain-English line under the graph. */
  say(text: string, tone?: Tone): void;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects with STOPPED once the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Plays `steps` in order, holding `hold` ms after each, and loops until disposed. */
  cycle(steps: readonly Step[], hold?: number): void;
  /** Adds a text panel beside the graph (full view only); returns its <pre>, or null in a card. */
  side(): HTMLPreElement | null;
  button(label: string, onClick: () => void): HTMLButtonElement | null;
  slider(label: string, min: number, max: number, step: number, value: number, onInput: (v: number) => void): HTMLInputElement | null;
  toggle(label: string, checked: boolean, onChange: (on: boolean) => void): HTMLInputElement | null;
  select<T extends string>(label: string, options: readonly SelectOption<T>[], value: T, onChange: (v: T) => void): HTMLSelectElement | null;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export interface Step {
  /** Caption while the step shows. */
  say?: string;
  run: () => unknown;
  /** Pause after this step, ms (overrides the cycle's hold). */
  hold?: number;
}

export const STOPPED = Symbol('stage disposed');

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'cg-wrap cg-card' : 'cg-wrap cg-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'cg-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'cg-scene';
  const div = document.createElement('div');
  div.className = 'cg-graph';
  if (!preview) div.style.height = `${opts.height ?? 420}px`;
  if (opts.background) div.style.background = opts.background;
  root.append(div);
  const caption = document.createElement('div');
  caption.className = 'cg-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'cg-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const waiters = new Set<(reason: unknown) => void>();
  const graphs: Pick<Graph, 'destroy'>[] = [];
  const devices: { canvas: HTMLCanvasElement; device: Promise<Device> }[] = [];
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  const stage: Stage = {
    div,
    root,
    preview,
    bar,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    device() {
      const canvas = document.createElement('canvas');
      const device = luma.createDevice({
        type: 'webgl',
        adapters: [webgl2Adapter],
        webgl: { antialias: false },
        createCanvasContext: { canvas, useDevicePixels: true, autoResize: true },
      });
      devices.push({ canvas, device });
      return device;
    },
    refit(graph, ms = 2500) {
      if (!preview) return;
      stage.every(ms, () => graph.fitView(Math.min(800, ms / 2), 0.12));
    },
    own(graph) {
      graphs.push(graph);
      return graph;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
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
    wait(ms) {
      return new Promise<void>((resolve, reject) => {
        if (stage.disposed) {
          reject(STOPPED);
          return;
        }
        const id = setTimeout(() => {
          timers.delete(id);
          waiters.delete(reject);
          resolve();
        }, ms);
        timers.add(id);
        waiters.add(reject);
      });
    },
    cycle(steps, hold = 2600) {
      const play = async (): Promise<void> => {
        for (;;) {
          for (const step of steps) {
            if (step.say !== undefined) stage.say(step.say);
            await step.run();
            await stage.wait(step.hold ?? hold);
          }
        }
      };
      play().catch((err: unknown) => {
        if (err === STOPPED || stage.disposed) return;
        console.error('cosmos.gl cycle failed', err);
        stage.say(`Stopped: ${err instanceof Error ? err.message : String(err)}`, 'bad');
      });
    },
    side() {
      if (preview) return null;
      const panel = document.createElement('div');
      panel.className = 'cg-side';
      const pre = document.createElement('pre');
      panel.append(pre);
      root.append(panel);
      return pre;
    },
    button: (label, onClick) => (bar ? addButton(bar, label, onClick, abort.signal) : null),
    slider: (label, min, max, step, value, onInput) =>
      bar ? addSlider(bar, label, min, max, step, value, onInput, abort.signal) : null,
    toggle: (label, checked, onChange) => (bar ? addToggle(bar, label, checked, onChange, abort.signal) : null),
    select: (label, options, value, onChange) =>
      bar ? addSelect(bar, label, options, value, onChange, abort.signal) : null,
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      for (const id of timers) clearTimeout(id);
      for (const id of intervals) clearInterval(id);
      for (const reject of waiters) reject(STOPPED);
      timers.clear();
      intervals.clear();
      waiters.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('cosmos.gl stage cleanup failed', err);
        }
      }
      for (const graph of graphs) {
        try {
          graph.destroy();
        } catch (err) {
          console.error('cosmos.gl destroy failed', err);
        }
      }
      for (const { canvas, device } of devices) {
        device.then(
          (d) => {
            d.destroy();
            canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();
          },
          (err: unknown) => console.error('cosmos.gl device creation failed', err),
        );
      }
      wrap.remove();
    },
  };
  return stage;
}
