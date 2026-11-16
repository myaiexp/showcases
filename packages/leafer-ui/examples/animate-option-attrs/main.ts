// Animate: attrs in the five forms the docs list
import { Leafer, type IAnimateOptions } from 'leafer-ui';
import '@leafer-in/state'; // hoverStyle, for the transition lane
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { formLab, runForms } from '../../shared/forms-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Only x glides; the colour snaps when the slide ends." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const lab = formLab(stage, leafer);
  const [byAnimation, byTransition, bySet, byAnimate, byClass] = lab.rects;
  const to = lab.to; // where the squares slide to

  // The option under test, the same in all five forms
  const options = { duration: 2, attrs: ['x'] } satisfies IAnimateOptions;

  let made: Animate | undefined;
  runForms(stage, lab, {
    start() {
      byTransition.set({ hoverStyle: { x: to, fill: '#ff4b4b' }, transition: options }); // hover it: the transition runs
      byAnimation.animation = { style: { x: to, fill: '#ff4b4b' }, ...options };
      bySet.set({ x: to, fill: '#ff4b4b' }, options);
      byAnimate.animate({ x: to, fill: '#ff4b4b' }, options);
      made = new Animate(byClass, { x: to, fill: '#ff4b4b' }, options);
    },
    stop() {
      made?.destroy();
      made = undefined;
    },
    hold: () => options.duration * 1000 + 300,
  });
  return stage.dispose;
};

export default mount;
