// VFX-JS example: waitFor as 'media', 'none' or a function
import { Crossfade } from '@vfx-js/transitions';
import type { TransitionHandle, TransitionWaitFor } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { PICTURE_KINDS } from '../../shared/pictures.ts';
import { slide } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const OPTIONS: readonly (readonly [TransitionWaitFor, string])[] = [
  ['media', "'media' (default)"],
  ['none', "'none'"],
  // Any promise works: here the capture waits 700 ms.
  [() => new Promise<void>((resolve) => setTimeout(resolve, 700)), '(el) => wait 700 ms'],
];

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx, { slides: [] });
  const { stage, vfx, box } = kit;
  const make = (n: number): HTMLElement => slide({ kind: PICTURE_KINDS[n % PICTURE_KINDS.length]!, title: `Slide ${n + 1}` });
  let n = 0;
  box.append(make(0));

  // waitFor is a container option, so changing it means a new handle.
  const build = (i: number): TransitionHandle => vfx.addTransition(box, { transition: Crossfade, duration: 0.8, waitFor: OPTIONS[i]![0] });
  let pick = 0;
  let t = build(pick);
  const next = async (): Promise<void> => {
    n++;
    const started = performance.now();
    stage.say(`waitFor ${OPTIONS[pick]![1]}: running...`);
    // A new <img> whose picture has not loaded when the callback returns.
    await t.run(() => {
      box.replaceChildren(make(n));
    });
    stage.say(`waitFor ${OPTIONS[pick]![1]}: run took ${Math.round(performance.now() - started)} ms (0.8 s animation included)`);
  };

  if (stage.bar) {
    select(stage.bar, 'waitFor', OPTIONS.map(([v, label], i) => [i, label] as const), (i) => {
      pick = i;
      t.destroy();
      t = build(i);
    });
    button(stage.bar, 'run()', () => void next());
  } else {
    // A card cycles the three options.
    stage.every(2600, () => {
      pick = (pick + 1) % OPTIONS.length;
      t.destroy();
      t = build(pick);
      void next();
    });
  }
  stage.say(`waitFor ${OPTIONS[0]![1]}`);
  return () => stage.dispose();
};

export default mount;
