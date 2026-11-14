// VFX-JS example: t.run(cb) swaps in a slide built on the fly
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PICTURE_KINDS } from '../../shared/pictures.ts';
import { slide } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  // No ready-made slides: the box starts empty and run() fills it.
  const { stage, vfx, box } = await trKit(el, ctx, { slides: [] });
  const make = (n: number): HTMLElement => slide({ kind: PICTURE_KINDS[n % PICTURE_KINDS.length]!, title: `Slide ${n + 1}` });
  let n = 0;
  box.append(make(n));

  const t = vfx.addTransition(box, { transition: Swipe, duration: 0.7 });
  const next = (): void => {
    n++;
    stage.say(`t.run(() => box.replaceChildren(slide ${n + 1})), while the old content is held`);
    // The callback changes the DOM; the promise resolves when the animation ends.
    void t.run(() => {
      box.replaceChildren(make(n));
    });
  };

  if (stage.bar) button(stage.bar, 'run(): build the next slide', next);
  else stage.every(2400, next);
  stage.say('t.run(cb) builds each slide inside cb');
  return () => stage.dispose();
};

export default mount;
