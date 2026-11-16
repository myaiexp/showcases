// Card scripts for Interaction examples: try a drag, tour through values
import type { IUI } from 'leafer-ui';
import type { Ghost, Point } from './ghost.ts';
import { label } from './basics.ts';
import { script, type Stage } from './stage.ts';

/** Puts `el` back at `home`, drags the ghost `from` to `to`, and says whether `el` moved. */
export async function tryDrag(stage: Stage, ghost: Ghost, el: IUI, home: Point, from: Point, to: Point): Promise<boolean> {
  el.set({ x: home.x, y: home.y });
  await stage.wait(250);
  await ghost.drag(from, to, 600);
  const moved = Math.hypot((el.x ?? 0) - home.x, (el.y ?? 0) - home.y) > 5;
  await stage.wait(300);
  return moved;
}

/** A card script that runs `step(value)` for each value in turn, forever. */
export function tour<T>(stage: Stage, values: readonly T[], step: (v: T) => Promise<void>): void {
  script(stage, async () => {
    for (const v of values) await step(v);
  });
}

/** A monospace log over the pane (newest line last, `n` kept): `log('enter')`. Returns the logger. */
export function logLines(stage: Stage, n = 6, bottom = false): (line: string) => void {
  const say = label(stage, '', bottom);
  const lines: string[] = [];
  return (line) => {
    lines.push(line);
    if (lines.length > n) lines.shift();
    say(lines.join('\n'));
  };
}

/** Moves the ghost off the pane, onto `at`, holds, and off again: one hover visit. `press` also clicks while there. */
export async function visit(stage: Stage, ghost: Ghost, at: Point, hold = 800, press = false): Promise<void> {
  ghost.leave();
  await stage.wait(400);
  await ghost.glide(at.x, at.y, 450);
  await stage.wait(hold / 2);
  if (press) {
    ghost.down();
    await stage.wait(80);
    ghost.up();
  }
  await stage.wait(hold / 2);
  ghost.leave();
  await stage.wait(300);
}
