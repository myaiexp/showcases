// Animate: the delay option in the five forms the docs list
import { Leafer, type IAnimateOptions } from 'leafer-ui';
import '@leafer-in/state'; // hoverStyle, for the transition lane
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { formLab, runForms } from '../../shared/forms-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Lanes restart on their own. Change delay and all five wait the same time before moving." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const lab = formLab(stage, leafer);
  const [byAnimation, byTransition, bySet, byAnimate, byClass] = lab.rects;
  const to = lab.to; // where the squares slide to

  // The option under test, the same in all five forms
  const options = { delay: 1, duration: 2 } satisfies IAnimateOptions;
  if (stage.bar) slider(stage.bar, 'delay (s)', 0, 3, 0.1, options.delay, (v) => (options.delay = v));
  let made: Animate | undefined;
  runForms(stage, lab, {
    start() {
      byTransition.set({ hoverStyle: { x: to }, transition: options }); // hover it: the transition runs
      byAnimation.animation = { style: { x: to }, ...options };
      bySet.set({ x: to }, options);
      byAnimate.animate({ x: to }, options);
      made = new Animate(byClass, { x: to }, options);
    },
    stop() {
      made?.destroy();
      made = undefined;
    },
    hold: () => (options.delay + options.duration) * 1000 + 300,
  });
  return stage.dispose;
};

export default mount;
