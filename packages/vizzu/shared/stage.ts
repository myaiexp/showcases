// Shared Vizzu stage: chart box, caption, control bar, story runner, cleanup
//
// Traps found while building the gallery (add to this list):
// - Vizzu fetches cvizzu.wasm next to vizzu.min.js, which Vite moves: createStage awaits
//   shared/setup.ts vizzuReady() first, which sets Vizzu.options({ wasmUrl }).
// - chart.detach() is the only cleanup (plugins, resize observer, the WASM chart). An animate()
//   promise pending at detach never settles, so the story races every step against dispose.
// - Vizzu's own look is light (white background, dark text). Every example passes
//   `{ style: darkStyle }` (shared/theme.ts) as the constructor's initial state. `style: null`
//   resets to Vizzu's light defaults, not to that dark state.
// - `isContiguous: true` on a dimension changes nothing visible in 0.18.
// - A measure's `unit` shows on axis and marker labels ("60 k$"), not in the axis title.
//   chart.data gives `unit: undefined` for a measure without one.
// - `Vizzu.presets` is a getter that builds a new Presets object on every read, so it is
//   never `===` to `chart.constructor.presets`, though both return the same configs.
// - pie, donut and variableRadiusPie take no y; donut sets only the y range, so a y series
//   left from the previous state stays and fills the hole: clear it in the step before.
// - Presets never reset `sort`; waterfall colours by a gradient of the y measure, not by sign.
// - The y-axis of a measure starts at 0: a measure in a narrow high band squashes its markers.
// - Range strings: 'Nmax' / 'Nmin' offset from the data's largest / smallest value (0 for
//   stacked bars), 'N%' is relative to the largest. A range on a dimension axis drops the
//   categories outside it, like a filter.
// - The cssProperties plugin lists custom property names from top-level stylesheet rules only,
//   and example CSS is nested under [data-example]: declare each --vizzu-… name empty on the
//   scope block (an empty value is ignored), then set it on a nested class.
// - chart.style reads null for sizes still automatic, then strings like "40.000000px".
// - config.orientation with measures on both axes and rectangles draws overlapping boxes from
//   the origin; it reads only with area or line geometry.
// - Tooltips need a real pointer over the canvas: synthetic events and caxi hovers show none.
import type Vizzu from 'vizzu';
import type { MountContext } from '@/types.ts';
import { vizzuReady } from './setup.ts';
import { runStory, type Step, type StoryOptions } from './story.ts';
import './stage.css';

export type { Step } from './story.ts';
export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface StageOptions {
  /** One line under the chart in the full view, such as "Click a column". */
  hint?: string;
  /** Chart height in the full view, px. Cards are always 200px. */
  height?: number;
}

export interface Stage {
  /** The element to hand `new Vizzu()`: Vizzu puts its canvas inside it. */
  element: HTMLElement;
  /** Scene row the chart sits in; append side panels here. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Detaches `chart` on cleanup. Returns `chart`. */
  own(chart: Vizzu): Vizzu;
  /** Sets the plain-English line under the chart. */
  say(text: string, tone?: Tone): void;
  /**
   * Plays `steps` one after another, holding between them; by default loops for ever,
   * animating back to the state the story started from before each repeat.
   */
  story(chart: Vizzu, steps: readonly Step[], opts?: StoryOptions): void;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`; rejects when the stage is disposed. */
  wait(ms: number): Promise<void>;
  /** Adds a text panel beside the chart (full view only); returns its <pre>, or null in a card. */
  side(): HTMLPreElement | null;
  /** Adds a button to the control bar (full view only); returns it, or null in a card. */
  button(label: string, onClick: () => void): HTMLButtonElement | null;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export const STOPPED = Symbol('stage disposed');

export async function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Promise<Stage> {
  const { preview } = ctx;
  await vizzuReady();
  const wrap = document.createElement('div');
  wrap.className = preview ? 'vz-wrap vz-card' : 'vz-wrap vz-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'vz-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'vz-scene';
  const element = document.createElement('div');
  element.className = 'vz-chart';
  if (!preview) element.style.height = `${opts.height ?? 400}px`;
  root.append(element);
  const caption = document.createElement('div');
  caption.className = 'vz-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'vz-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const waiters = new Set<(reason: unknown) => void>();
  const charts: Vizzu[] = [];
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  const stage: Stage = {
    element,
    root,
    preview,
    bar,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    own(chart) {
      charts.push(chart);
      return chart;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    story(chart, steps, storyOpts = {}) {
      runStory(stage, chart, steps, storyOpts).catch((err: unknown) => {
        if (err === STOPPED || stage.disposed) return;
        console.error('vizzu story failed', err);
        stage.say(`The story stopped: ${err instanceof Error ? err.message : String(err)}`, 'bad');
      });
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
    side() {
      if (preview) return null;
      const panel = document.createElement('div');
      panel.className = 'vz-side';
      const pre = document.createElement('pre');
      panel.append(pre);
      root.append(panel);
      return pre;
    },
    button(label, onClick) {
      if (!bar) return null;
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', onClick, { signal: abort.signal });
      bar.append(b);
      return b;
    },
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
          console.error('vizzu stage cleanup failed', err);
        }
      }
      for (const chart of charts) {
        try {
          chart.detach();
        } catch (err) {
          console.error('vizzu detach failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
