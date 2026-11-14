// Example steps: a card plays them in a loop, the full view gives each a button
import { button } from './controls.ts';
import type { Stage } from './stage.ts';

export interface Step {
  /** Button text in the full view. */
  label: string;
  run: () => unknown;
  /** How long a card shows this step's result before the next, in ms. Default 1900. */
  hold?: number;
}

export interface TourOptions {
  /** Full view: also play the steps on their own, like the card (default false). */
  autoplay?: boolean;
  /** Runs once before the steps (both views), e.g. seeding the table. */
  setup?: () => unknown;
  /** Card only: runs after the last step, before looping (e.g. clearing the table). */
  reset?: () => unknown;
}

export function tour(stage: Stage, steps: readonly Step[], opts: TourOptions = {}): void {
  const ready = Promise.resolve(opts.setup?.());
  if (stage.preview || opts.autoplay) {
    let first = true;
    stage.play(async (wait) => {
      if (first) {
        first = false;
        await ready;
      }
      for (const step of steps) {
        await step.run();
        await wait(step.hold ?? 1900);
      }
      await opts.reset?.();
    });
  }
  if (!stage.preview) {
    ready.catch(stage.fail);
    // A step listed twice (to repeat it in the card loop) still gets one button.
    for (const step of new Set(steps)) button(stage, step.label, async () => {
      await ready;
      await step.run();
    });
  }
}
