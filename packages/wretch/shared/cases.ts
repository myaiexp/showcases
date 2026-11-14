// Runs a list of cases: a card loops through them, the full view has a button for each
import { button } from './controls.ts';
import type { Stage } from './stage.ts';

export interface Case {
  label: string;
  /** Does one thing, such as sending a request, and shows the outcome. Must end its own chains in a catcher. */
  run: () => Promise<unknown> | void;
}

/** Runs one case; a failure is logged unless the stage was closed meanwhile. */
async function attempt(stage: Stage, c: Case): Promise<void> {
  try {
    await c.run();
  } catch (err) {
    if (!stage.disposed) console.error('wretch case failed', c.label, err);
  }
}

/**
 * Card: cycles through every case, `gap` ms after each finishes, for ever. Full view: a
 * button per case, and the first case runs once. `before` runs ahead of each case in a card.
 */
export function runCases(stage: Stage, list: readonly Case[], gap = 1800, before?: () => void): void {
  if (stage.bar) {
    for (const c of list) button(stage.bar, c.label, () => void attempt(stage, c));
    void attempt(stage, list[0]!);
    return;
  }
  stage.play(async (wait) => {
    for (const c of list) {
      before?.();
      await attempt(stage, c);
      await wait(gap);
    }
  });
}

/** A scripted sequence: loops in a card, runs once in the full view. */
export function runScript(stage: Stage, script: (wait: (ms: number) => Promise<void>) => Promise<void>): void {
  if (stage.preview) return stage.play(script);
  script(stage.wait).catch((err: unknown) => {
    if (!stage.disposed) console.error('wretch script failed', err);
  });
}
