// Animation: reverse playback and the speed multiplier
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same slide, same duration: speed 2 finishes twice as often, reverse starts from the right.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const runs = [
    { name: 'default', options: {} },
    { name: 'reverse: true', options: { reverse: true } },
    { name: 'speed: 2', options: { speed: 2 } },
    { name: 'speed: 0.5', options: { speed: 0.5 } },
  ];
  const l = lanes(stage, leafer, runs.map((r) => r.name));
  runs.forEach((run, i) => {
    leafer.add(
      runner(l, i, {
        animation: { style: { x: l.right }, duration: 2, loop: true, easing: 'linear', ...run.options },
      }),
    );
  });
  return stage.dispose;
};

export default mount;
