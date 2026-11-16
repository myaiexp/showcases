// Animation: delay before the first run, loop count and the pause between loops
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, replay, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Lanes replay every 7 s. delay waits first, loop: 2 plays twice, loopDelay rests between plays.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const runs = [
    { name: 'no options', options: {} },
    { name: 'delay: 1', options: { delay: 1 } },
    { name: 'loop: 2', options: { loop: 2 } },
    { name: 'loop: 2, loopDelay: 0.6', options: { loop: 2, loopDelay: 0.6 } },
  ];
  const l = lanes(stage, leafer, runs.map((r) => r.name));
  const rects = runs.map((_, i) => runner(l, i));
  leafer.add(rects);
  replay(stage, 7000, () => {
    runs.forEach((run, i) => {
      rects[i]!.x = l.left;
      rects[i]!.animation = { style: { x: l.right }, duration: 1, ending: 'from', ...run.options };
    });
  });
  return stage.dispose;
};

export default mount;
