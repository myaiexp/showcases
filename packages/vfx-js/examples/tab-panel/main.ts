// VFX-JS example: three slides in one box, show() swipes from one to the next
import { VFX } from '@vfx-js/core';
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { DEFAULT_SLIDES, slideBox } from '../../shared/slides.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // The sections are the slides: a fixed-size box, the first shown, the others hidden.
  const panel = await slideBox(stage);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A handle at once; no DOM is touched until the first run.
  const t = vfx.addTransition(panel, { transition: Swipe, duration: 0.6 });
  let current = 0;
  const go = (i: number): void => {
    current = i;
    stage.say(`t.show(${i}): ${DEFAULT_SLIDES[i]!.title}`);
    // show() hides the other slides and animates to this one. Resolves when it ends.
    void t.show(i);
  };

  if (stage.bar) {
    // Keep the buttons outside the container.
    DEFAULT_SLIDES.forEach((s, i) => button(stage.bar!, s.title, () => go(i)));
  } else {
    stage.every(2200, () => go((current + 1) % DEFAULT_SLIDES.length));
  }
  stage.say('t.show(0): Dusk');
  return () => stage.dispose();
};

export default mount;
