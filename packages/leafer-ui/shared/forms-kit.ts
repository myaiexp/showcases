// Five lanes for the animate docs' five call forms: animation, transition (hover), set, animate, Animate
import type { Leafer, Rect } from 'leafer-ui';
import { lanes, runner, type Lanes } from './event-kit.ts';
import { script, type Stage } from './stage.ts';
import type { Ghost } from './ghost.ts';

export const FORM_NAMES = ['animation', 'transition (hover)', 'set()', 'animate()', 'new Animate'] as const;

export interface FormLab {
  l: Lanes;
  /** The lane squares, in the order of FORM_NAMES. */
  rects: [Rect, Rect, Rect, Rect, Rect];
  /** x a lane's square slides to. */
  to: number;
  ghost: Ghost;
  /** Kills every running animation on the squares and puts them back at the left. */
  reset(): void;
}

/** Builds the five lanes with a square in each, resting at the left. */
export function formLab(stage: Stage, leafer: Leafer, names: readonly string[] = FORM_NAMES): FormLab {
  const l = lanes(stage, leafer, names);
  const rects = names.map((_, i) => runner(l, i)) as FormLab['rects'];
  leafer.add(rects);
  const ghost = stage.ghost(leafer);
  return {
    l,
    rects,
    to: l.right,
    ghost,
    reset() {
      for (const r of rects) {
        r.killAnimate();
        r.set({ x: l.left, y: l.y(rects.indexOf(r)) });
      }
    },
  };
}

export interface RunOptions {
  /** Starts the forms that run by themselves (animation, set, animate, Animate). */
  start(): void;
  /** Called before every reset: destroy a `new Animate` here. */
  stop?(): void;
  /** Ms the run takes in total (delay + duration), read at every cycle. */
  hold: () => number;
  /** Ms after hover ends before the next cycle (default 0: the way back). */
  back?: () => number;
  /** Hover the transition lane (default true). */
  hover?: boolean;
}

/**
 * Repeats: reset, start the forms, hover the transition lane while they run, move off it so
 * its transition runs back, wait, and again. Cards and the full view run the same loop.
 */
export function runForms(stage: Stage, lab: FormLab, o: RunOptions): void {
  stage.onDispose(() => o.stop?.());
  const { l, ghost } = lab;
  const target = { x: l.left + l.s / 2, y: l.y(1) + l.s / 2 };
  script(stage, async () => {
    o.stop?.();
    ghost.leave();
    lab.reset();
    await stage.wait(250);
    o.start();
    if (o.hover !== false) await ghost.glide(target.x, target.y, 200);
    await stage.wait(o.hold());
    ghost.leave();
    await stage.wait(o.back ? o.back() : o.hold() * 0.6 + 300);
  });
}
