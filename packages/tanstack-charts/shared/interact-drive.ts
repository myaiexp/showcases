// Pretend pointer, click and key input for cards: events go to one element and never bubble
import type { Stage } from './stage.ts';

/** A pointer position as fractions of the target's width and height. */
export type Spot = readonly [number, number];

export function fire(target: Element, type: string, [fx, fy]: Spot): void {
  const r = target.getBoundingClientRect();
  if (!r.width) return;
  target.dispatchEvent(
    new PointerEvent(type, { clientX: r.left + fx * r.width, clientY: r.top + fy * r.height, pointerType: 'mouse', pointerId: 1, isPrimary: true, bubbles: false }),
  );
}

export function click(target: Element, [fx, fy]: Spot): void {
  const r = target.getBoundingClientRect();
  if (!r.width) return;
  target.dispatchEvent(new MouseEvent('click', { clientX: r.left + fx * r.width, clientY: r.top + fy * r.height, bubbles: false }));
}

export interface VisitOptions {
  /** Element that receives the events, or a function that finds it at each step (default: the first chart box). */
  target?: Element | (() => Element | null);
  /** Click after moving to step `i` when this returns true. */
  click?: (i: number) => boolean;
  /** Send a mouseleave after the last step, then start again. */
  leave?: boolean;
  /** Start delay in ms (default 300). */
  delay?: number;
}

/** Moves a pretend mouse from spot to spot every `ms`, optionally clicking, for ever. */
export function visit(stage: Stage, spots: readonly Spot[], ms: number, opts: VisitOptions = {}): void {
  const find = (): Element | null => (typeof opts.target === 'function' ? opts.target() : (opts.target ?? stage.box));
  let i = 0;
  stage.after(opts.delay ?? 300, () => {
    const step = (): void => {
      const target = find();
      if (!target) return;
      const spot = spots[i % spots.length]!;
      if (opts.leave && i % spots.length === 0 && i > 0) target.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
      fire(target, 'pointermove', spot);
      if (opts.click?.(i % spots.length)) stage.after(ms * 0.45, () => click(target, spot));
      i++;
    };
    step();
    stage.every(ms, step);
  });
}

/** Sends a keydown to `target` (an element, or a function that finds it) every `ms`, cycling through `list`. */
export function keys(stage: Stage, target: Element | (() => Element | null), list: readonly string[], ms: number, delay = 400): void {
  let i = 0;
  stage.after(delay, () => {
    const press = (): void => {
      const el = typeof target === 'function' ? target() : target;
      el?.dispatchEvent(new KeyboardEvent('keydown', { key: list[i++ % list.length]!, bubbles: false }));
    };
    press();
    stage.every(ms, press);
  });
}

/** Turns a path function (t in [0, 1) to a spot) into `n` spots to visit. */
export function trail(path: (t: number) => Spot, n = 40): Spot[] {
  return Array.from({ length: n }, (_, i) => path(i / n));
}

/** The spots of scene points `indexes`, so a card can aim at real marks. */
export function spotsOf(scene: { width: number; height: number; points: readonly { x: number; y: number }[] }, indexes: readonly number[]): Spot[] {
  return indexes.map((i) => [scene.points[i]!.x / scene.width, scene.points[i]!.y / scene.height] as const);
}
