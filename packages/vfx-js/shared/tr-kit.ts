// Scaffold for transition examples: stage, slide box, VFX, next/back driver
import { VFX } from '@vfx-js/core';
import type { ShowOpts, TransitionHandle } from '@vfx-js/core';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { DEFAULT_SLIDES, slideBox, type SlideSpec } from './slides.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

export interface TrKit {
  stage: Stage;
  /** The fixed-size transition target (inline px width). */
  box: HTMLElement;
  vfx: VFX;
  slides: readonly SlideSpec[];
}

export interface TrKitOptions extends StageOptions {
  slides?: readonly SlideSpec[];
}

/**
 * A stage with a slide box and a VFX that is already owned. The example then calls
 * `kit.vfx.addTransition(kit.box, ...)` itself.
 */
export async function trKit(el: HTMLElement, ctx: MountContext, opts: TrKitOptions = {}): Promise<TrKit> {
  const stage = createStage(el, ctx, opts);
  const slides = opts.slides ?? DEFAULT_SLIDES;
  const box = await slideBox(stage, slides);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  return { stage, box, vfx, slides };
}

export interface DriveOptions {
  /** Caption text for a run: what the transition is and how it is set. */
  label: () => string;
  /** Per-run show() options (for example `reverse`). */
  showOpts?: () => ShowOpts;
  /** Card loop period in ms (default 2600). */
  ms?: number;
  /** Called with the new slide index right before each show(). */
  onStep?: (index: number) => void;
}

/**
 * Cycles the slides with `t.show(i)`: a card does it every `ms` for ever; the full view gets
 * "Next" and "Back" buttons (Back plays `reverse: true` to the previous slide).
 * `handle` may be a function, for examples that replace their handle. Returns `step(dir)`, which moves one slide and resolves when the run ends.
 */
export function drive(kit: TrKit, handle: TransitionHandle | (() => TransitionHandle), opts: DriveOptions): (dir: 1 | -1) => Promise<void> {
  const { stage, slides } = kit;
  let current = 0;
  const step = (dir: 1 | -1): Promise<void> => {
    current = (current + dir + slides.length) % slides.length;
    opts.onStep?.(current);
    // showOpts first: it may change the state the label describes.
    const showOpts = opts.showOpts?.();
    stage.say(`${opts.label()} -> ${slides[current]!.title}`);
    return (typeof handle === 'function' ? handle() : handle).show(current, { ...(dir < 0 ? { reverse: true } : {}), ...showOpts });
  };
  if (stage.bar) {
    button(stage.bar, 'Next', () => void step(1));
    button(stage.bar, 'Back (reverse)', () => void step(-1));
  } else {
    stage.every(opts.ms ?? 2600, () => void step(1));
  }
  stage.say(`${opts.label()} (showing ${slides[0]!.title})`);
  return step;
}

/** `{ amount: 1, speed: 2 }` as "amount 1, speed 2". */
export function describe(params: object): string {
  const parts = Object.entries(params).map(([k, v]) => `${k} ${typeof v === 'number' ? +v.toFixed(2) : String(v)}`);
  return parts.length ? parts.join(', ') : 'no params';
}
