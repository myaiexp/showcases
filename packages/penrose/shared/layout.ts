// Compiles a trio, animates the solve on the paper, resamples on demand
import { compile, evalEnergy, resample, showError, type PenroseState } from '@penrose/core';
import { solve, type SolveInfo } from './solver.ts';
import { STOPPED, type Stage } from './stage.ts';

/** A Penrose trio, as `compile` takes it. */
export interface Trio {
  domain: string;
  substance: string;
  style: string;
  /** The random seed every sampled value comes from. Default "showcase". */
  variation?: string;
  /** Warning types compile should not report, such as "LayerCycleWarning". */
  excludeWarnings?: string[];
}

export interface LayoutHooks {
  /** Called with the compiled state, before the solve starts. */
  onCompiled?(state: PenroseState): void;
  /** Called after each rendered step, with the svg on the paper. */
  onStep?(state: PenroseState, info: SolveInfo, svg: SVGSVGElement): void;
  /** Called once the last layout stage has converged and been drawn. */
  onDone?(state: PenroseState, svg: SVGSVGElement): void;
  /** Called when compile or the optimizer fails, after the caption says why. */
  onError?(err: unknown): void;
  /** Animate the solve (default true). When false only the converged layout is drawn. */
  animate?: boolean;
}

export interface Layout {
  /** Compiles `trio` and solves it from its first sample. Resolves once it is drawn. */
  run(trio: Trio): Promise<void>;
  /** Samples the compiled state again under a new variation and solves it. */
  resample(variation?: string): Promise<void>;
  /** Solves the current variation again from its first sample. */
  replay(): Promise<void>;
  readonly state: PenroseState | null;
  readonly variation: string;
  readonly trio: Trio | null;
}

const DEFAULT_VARIATION = 'showcase';

/** The readable stage list, e.g. "shape → label", with the current one bracketed. */
export function stageLine(state: PenroseState): string {
  if (state.optStages.length < 2) return '';
  return state.optStages.map((s, i) => (i === state.currentStageIndex ? `[${s}]` : s)).join(' → ');
}

export function createLayout(stage: Stage, hooks: LayoutHooks = {}): Layout {
  let compiled: PenroseState | null = null;
  let current: PenroseState | null = null;
  let trio: Trio | null = null;
  let variation = DEFAULT_VARIATION;
  let resamples = 0;
  let run: AbortController | null = null;

  // A new run aborts the old one, and disposal aborts whichever is live.
  const fresh = (): AbortSignal => {
    run?.abort();
    run = new AbortController();
    return run.signal;
  };
  stage.onDispose(() => run?.abort());

  const failed = (err: unknown): void => {
    if (err === STOPPED || stage.disposed) return;
    stage.fail(err);
    hooks.onError?.(err);
  };

  const animateSolve = (start: PenroseState, signal: AbortSignal): Promise<void> =>
    new Promise<void>((resolve) => {
      // toSVG is async: draw the newest state when the previous draw finishes, never queue.
      let drawing = false;
      let pending: { state: PenroseState; info: SolveInfo } | null = null;
      const draw = async (): Promise<void> => {
        if (drawing || !pending) return;
        drawing = true;
        const { state, info } = pending;
        pending = null;
        try {
          const svg = await stage.render(state);
          if (!svg || signal.aborted) return resolve();
          hooks.onStep?.(state, info, svg);
          if (info.done) {
            hooks.onDone?.(state, svg);
            resolve();
          }
        } catch (err) {
          failed(err);
          resolve();
        } finally {
          drawing = false;
        }
        if (pending) void draw();
      };
      solve(start, {
        signal,
        onStep(state, info) {
          current = state;
          if (hooks.animate === false && !info.done) return;
          pending = { state, info };
          void draw();
        },
        onError(err) {
          failed(err);
          resolve();
        },
      });
      signal.addEventListener('abort', () => resolve(), { once: true });
    });

  const solveFrom = async (state: PenroseState): Promise<void> => {
    const signal = fresh();
    current = state;
    hooks.onCompiled?.(state);
    await animateSolve(state, signal);
  };

  const layout: Layout = {
    get state() {
      return current;
    },
    get variation() {
      return variation;
    },
    get trio() {
      return trio;
    },
    async run(next) {
      trio = next;
      variation = next.variation ?? DEFAULT_VARIATION;
      resamples = 0;
      const signal = fresh();
      let res;
      try {
        res = await compile({ ...next, variation });
      } catch (err) {
        if (!signal.aborted) failed(err);
        return;
      }
      if (signal.aborted || stage.disposed) return;
      if (res.isErr()) return failed(res.error);
      compiled = res.value;
      if (compiled.warnings.length > 0 && !stage.preview) {
        stage.say(compiled.warnings.map((w) => showError(w)).join('\n'), 'warn');
      }
      await solveFrom(compiled);
    },
    async resample(next) {
      if (!compiled) return;
      variation = next ?? `${trio?.variation ?? DEFAULT_VARIATION}-${++resamples}`;
      // resample() seeds from state.variation, so the new seed goes into the state first.
      await solveFrom(resample({ ...compiled, variation }));
    },
    async replay() {
      if (!compiled) return;
      await solveFrom(resample({ ...compiled, variation }));
    },
  };
  return layout;
}

/** "energy 0.0012", for readouts. evalEnergy runs the energy once, so call it sparingly. */
export function energyText(state: PenroseState): string {
  const e = evalEnergy(state);
  return `energy ${Math.abs(e) < 1e-3 && e !== 0 ? e.toExponential(1) : e.toFixed(3)}`;
}
