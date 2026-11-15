// Page-wide loop that steps every running Penrose layout within a frame budget
import { finalStage, isOptimized, nextStage, step, type PenroseError, type PenroseState } from '@penrose/core';

export interface SolveOptions {
  signal: AbortSignal;
  /** Called after every slice with the new state; `done` once the last stage converged. */
  onStep(state: PenroseState, info: SolveInfo): void;
  /** Called once if the optimizer fails (a NaN, usually). */
  onError(err: PenroseError): void;
  /**
   * Optimizer iterations allowed in a slice, given the slice's index. The default
   * starts at 1 and grows, so the first moves are visible and long solves still finish.
   */
  pace?: (slice: number) => number;
}

export interface SolveInfo {
  /** Iterations taken so far. */
  iterations: number;
  /** Slices (animation frames) taken so far. */
  slices: number;
  done: boolean;
}

interface Job extends SolveOptions {
  state: PenroseState;
  iterations: number;
  slices: number;
}

/**
 * step() runs synchronously on the main thread. Every layout on the page shares this
 * budget, so six cards solving at once still leave the page room to scroll.
 */
const FRAME_BUDGET_MS = 10;
const MIN_SLICE_MS = 2;

const defaultPace = (slice: number): number => 1 + Math.floor(slice / 5);

const jobs = new Set<Job>();
let raf = 0;

function sliceOf(job: Job, deadline: number): void {
  const want = (job.pace ?? defaultPace)(job.slices);
  let taken = 0;
  // step() asks `until` before each iteration and stops at the first true; it also stops
  // on its own when the current stage converges.
  const res = step(job.state, { until: () => taken++ >= want || performance.now() > deadline });
  job.slices++;
  if (res.isErr()) {
    jobs.delete(job);
    job.onError(res.error);
    return;
  }
  job.iterations += Math.max(0, taken - 1);
  let state = res.value;
  // What stepTimes does: a converged stage that is not the last hands over to the next.
  if (isOptimized(state) && !finalStage(state)) state = nextStage(state);
  job.state = state;
  const done = isOptimized(state) && finalStage(state);
  if (done) jobs.delete(job);
  job.onStep(state, { iterations: job.iterations, slices: job.slices, done });
}

function tick(): void {
  raf = 0;
  const list = [...jobs];
  const share = Math.max(MIN_SLICE_MS, FRAME_BUDGET_MS / Math.max(1, list.length));
  for (const job of list) {
    if (job.signal.aborted) {
      jobs.delete(job);
      continue;
    }
    sliceOf(job, performance.now() + share);
  }
  if (jobs.size > 0) raf = requestAnimationFrame(tick);
}

/**
 * Optimizes `state` a slice per frame until every layout stage has converged, reporting
 * each intermediate state. Aborting `signal` drops the job.
 */
export function solve(state: PenroseState, opts: SolveOptions): void {
  if (opts.signal.aborted) return;
  const job: Job = { ...opts, state, iterations: 0, slices: 0 };
  jobs.add(job);
  opts.signal.addEventListener('abort', () => jobs.delete(job), { once: true });
  if (!raf) raf = requestAnimationFrame(tick);
}
