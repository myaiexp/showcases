// after t.destroy(), show() still changes the DOM but no longer animates
import { Swipe } from '@vfx-js/transitions';
import type { TransitionHandle } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { DEFAULT_SLIDES } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx);
  const add = (): TransitionHandle => vfx.addTransition(box, { transition: Swipe, duration: 0.8 });
  let t = add();
  let alive = true;
  let i = 0;
  const state = (): string => (alive ? 'tracked: show() animates' : 'destroyed: show() cuts');
  const go = (): void => {
    i = (i + 1) % DEFAULT_SLIDES.length;
    stage.say(`${state()} -> ${DEFAULT_SLIDES[i]!.title}`);
    void t.show(i);
  };
  const destroy = (): void => {
    t.destroy();
    alive = false;
    stage.say('t.destroy(): the handle stops tracking the element');
  };
  const readd = (): void => {
    if (alive) return;
    t = add();
    alive = true;
    stage.say('vfx.addTransition(box): a new handle');
  };

  if (stage.bar) {
    button(stage.bar, 'show next', go);
    button(stage.bar, 't.destroy()', destroy);
    button(stage.bar, 'addTransition again', readd);
  } else {
    stage.play(async (wait) => {
      go();
      await wait(1600);
      destroy();
      await wait(700);
      go();
      await wait(1200);
      readd();
      go();
      await wait(1800);
    });
  }
  stage.say(state());
  return () => stage.dispose();
};

export default mount;
