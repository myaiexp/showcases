// Steps an optimization Run a few iterations per frame, then starts over
import type { Run } from '@penrose/core';
import type { Stage } from './stage.ts';

export interface RunLoopOptions {
  /** Starts a fresh Run for attempt 0, 1, 2, … (each pass of the loop). */
  begin(attempt: number): Run;
  /** Called with the starting Run (iteration 0) and after every step. */
  show(run: Run, iteration: number, attempt: number): void;
  /** Called once when the Run converged (or hit the iteration cap), before the pause. */
  done?(run: Run, iteration: number, attempt: number): void;
  /** Optimizer iterations per tick. Default 1. */
  perTick?: number;
  /** Minimum ms between ticks, so a solve that converges in ten iterations can be watched. Default 130. */
  tickMs?: number;
  /** Pause after convergence before the next attempt. Default 1800. */
  holdMs?: number;
  /** Gives up on a Run that has not converged by then. Default 120. */
  cap?: number;
}

export interface RunLoop {
  /** Starts again from attempt 0 (or the given attempt). */
  restart(attempt?: number): void;
}

/**
 * `run({ until })` is synchronous and `until` is asked before each iteration, so a counter
 * in it takes exactly that many iterations. The loop owns one requestAnimationFrame chain
 * and cancels it when the stage is disposed.
 */
export function runLoop(stage: Stage, o: RunLoopOptions): RunLoop {
  const perTick = o.perTick ?? 1;
  const tickMs = o.tickMs ?? 130;
  const holdMs = o.holdMs ?? 1800;
  const cap = o.cap ?? 120;
  let raf = 0;
  let epoch = 0;

  const start = (attempt: number): void => {
    const mine = ++epoch;
    cancelAnimationFrame(raf);
    let run = o.begin(attempt);
    let iteration = 0;
    let last = performance.now();
    o.show(run, 0, attempt);
    const tick = (now: number): void => {
      if (stage.disposed || mine !== epoch) return;
      raf = requestAnimationFrame(tick);
      if (now - last < tickMs) return;
      last = now;
      let n = 0;
      run = run.run({ until: () => n++ >= perTick });
      iteration += perTick;
      o.show(run, iteration, attempt);
      if (run.converged || iteration >= cap) {
        cancelAnimationFrame(raf);
        o.done?.(run, iteration, attempt);
        stage.after(holdMs, () => {
          if (mine === epoch) start(attempt + 1);
        });
      }
    };
    raf = requestAnimationFrame(tick);
  };

  stage.onDispose(() => {
    epoch++;
    cancelAnimationFrame(raf);
  });
  start(0);
  return { restart: (attempt = 0) => start(attempt) };
}
