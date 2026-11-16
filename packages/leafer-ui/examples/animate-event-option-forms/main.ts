// Animate: the event option in the five forms the docs list
import { Leafer, Text, type IAnimateOptions } from 'leafer-ui';
import '@leafer-in/state'; // hoverStyle, for the transition lane
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { formLab, runForms } from '../../shared/forms-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each lane counts created, update and completed calls from its own event option.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const lab = formLab(stage, leafer);
  const [byAnimation, byTransition, bySet, byAnimate, byClass] = lab.rects;
  const to = lab.to;

  // One counter line per lane, filled in by that lane's callbacks
  const stats = lab.rects.map((_, i) => {
    const text = new Text({ x: stage.width - (stage.preview ? 118 : 190), y: lab.l.y(i) - 1, fontSize: stage.preview ? 9 : 11, fill: '#888', hittable: false });
    leafer.add(text);
    return text;
  });
  const counts = lab.rects.map(() => ({ created: 0, update: 0, completed: 0 }));
  const options = (i: number): IAnimateOptions => ({
    duration: 1.5,
    event: {
      // the event option: created, update and completed callbacks
      created() {
        counts[i]!.created++;
      },
      update() {
        counts[i]!.update++;
        stats[i]!.text = `c${counts[i]!.created} u${counts[i]!.update} done${counts[i]!.completed}`;
      },
      completed() {
        counts[i]!.completed++;
        stats[i]!.text = `c${counts[i]!.created} u${counts[i]!.update} done${counts[i]!.completed}`;
      },
    },
  });

  let made: Animate | undefined;
  runForms(stage, lab, {
    start() {
      counts.forEach((c) => Object.assign(c, { created: 0, update: 0, completed: 0 }));
      byTransition.set({ hoverStyle: { x: to }, transition: options(1) });
      byAnimation.animation = { style: { x: to }, ...options(0) };
      bySet.set({ x: to }, options(2));
      byAnimate.animate({ x: to }, options(3));
      made = new Animate(byClass, { x: to }, options(4));
    },
    stop() {
      made?.destroy();
      made = undefined;
    },
    hold: () => 2200,
  });
  return stage.dispose;
};

export default mount;
