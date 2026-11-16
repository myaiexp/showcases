// Animate: loopDelay in the five forms the docs list
import { Leafer, type IAnimateOptions } from 'leafer-ui';
import '@leafer-in/state'; // hoverStyle, for the transition lane
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { formLab, runForms } from '../../shared/forms-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Each lane waits at the right before starting over." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const lab = formLab(stage, leafer);
  const [byAnimation, byTransition, bySet, byAnimate, byClass] = lab.rects;
  const to = lab.to; // where the squares slide to

  // The option under test, the same in all five forms
  const options = { duration: 1.2, loop: true, loopDelay: 1 } satisfies IAnimateOptions;
  if (stage.bar) slider(stage.bar, 'loopDelay (s)', 0, 2, 0.1, options.loopDelay, (v) => (options.loopDelay = v));
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
    hold: () => 5400,
  });
  return stage.dispose;
};

export default mount;
