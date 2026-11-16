// Animation: swing as true or as a count of arrivals at the to style
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, replay, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'swing: n stops after reaching the right end n times; swing: true never stops. Replays every 8 s.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const counts: (boolean | number)[] = [true, 1, 2, 3];
  const l = lanes(stage, leafer, counts.map((c) => `swing: ${c}`));
  const rects = counts.map((_, i) => runner(l, i));
  leafer.add(rects);
  replay(stage, 8000, () => {
    counts.forEach((swing, i) => {
      rects[i]!.x = l.left;
      rects[i]!.animation = { style: { x: l.right }, duration: 0.8, swing };
    });
  });
  return stage.dispose;
};

export default mount;
