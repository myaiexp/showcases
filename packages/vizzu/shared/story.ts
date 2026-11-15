// Story runner: plays animate steps in order and loops, with pause and restart
import type Vizzu from 'vizzu';
import type { AnimControl } from 'vizzu';
import type { Stage } from './stage.ts';

export interface Step {
  /** Caption shown while the step runs (and its entry in the full view's step list). */
  say?: string;
  /** Runs the step, usually one chart.animate() call. Return it so the story waits for it. */
  run: (chart: Vizzu) => unknown;
  /** Pause after the step finishes, ms. */
  hold?: number;
}

export interface StoryOptions {
  /** Repeat for ever (default true). */
  loop?: boolean;
  /** Before repeating, animate back to the chart state the story started from (default true). */
  rewind?: boolean;
  /** Default pause after each step, ms. */
  hold?: number;
}

const isThenable = (v: unknown): v is PromiseLike<unknown> =>
  typeof v === 'object' && v !== null && typeof (v as { then?: unknown }).then === 'function';

export async function runStory(stage: Stage, chart: Vizzu, steps: readonly Step[], opts: StoryOptions): Promise<void> {
  const { loop = true, rewind = true } = opts;
  const hold = opts.hold ?? (stage.preview ? 1100 : 1500);
  // Config, style and data filter as they are now; records added later are not part of it.
  const start = chart.store();
  const stopped = new Promise<never>((_, reject) => {
    stage.signal.addEventListener('abort', () => reject(new Error('disposed')), { once: true });
  });
  stopped.catch(() => {});
  /** Waits for `v` (an animate() result or any promise), or rejects once the stage is gone. */
  const settle = async (v: unknown): Promise<void> => {
    if (!isThenable(v)) return;
    const activated = (v as { activated?: Promise<AnimControl> }).activated;
    activated?.then((c) => {
      control = c;
      if (paused) c.pause();
    }, () => {});
    await Promise.race([v, stopped]);
    control = null;
  };

  let control: AnimControl | null = null;
  let paused = false;
  let restart = false;
  let wake: (() => void) | null = null;
  const items: HTMLLIElement[] = [];

  if (stage.bar) {
    const list = document.createElement('ol');
    list.className = 'vz-steps';
    for (const step of steps) {
      const li = document.createElement('li');
      li.textContent = step.say ?? '…';
      items.push(li);
      list.append(li);
    }
    const toggle = stage.button('Pause', () => {
      paused = !paused;
      toggle!.textContent = paused ? 'Play' : 'Pause';
      if (paused) control?.pause();
      else {
        control?.play();
        wake?.();
      }
    });
    stage.button('Restart', () => {
      restart = true;
      control?.play();
      if (paused) toggle!.click();
      wake?.();
    });
    stage.root.after(list);
  }

  const gate = async (): Promise<void> => {
    while (paused && !restart) await new Promise<void>((r) => (wake = r));
    wake = null;
  };
  const rest = async (ms: number): Promise<void> => {
    await Promise.race([stage.wait(ms), new Promise<void>((r) => (wake = r))]);
    wake = null;
    await gate();
  };

  for (;;) {
    for (let i = 0; i < steps.length && !restart; i++) {
      const step = steps[i]!;
      items.forEach((li, j) => li.classList.toggle('vz-now', j === i));
      // The full view's step list already highlights the step, so the caption is cleared.
      if (items.length) stage.say('');
      else if (step.say) stage.say(step.say);
      await settle(step.run(chart));
      await rest(step.hold ?? hold);
    }
    if (!loop && !restart) return;
    restart = false;
    if (rewind) {
      items.forEach((li) => li.classList.remove('vz-now'));
      stage.say('Back to the start');
      await settle(chart.animate(start));
      await rest(hold / 2);
    }
  }
}
