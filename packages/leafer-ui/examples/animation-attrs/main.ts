// Animation: attrs limits which style keys the animation changes
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same style in both lanes; attrs: [\'x\'] tweens only x, so fill and corners jump at the ends of each run.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const l = lanes(stage, leafer, ['all keys', "attrs: ['x']"]);
  const style = { x: l.right, fill: '#ff4b4b', cornerRadius: 0 };
  const base = { duration: 1.2, swing: true, easing: 'sine-in-out' } as const;
  leafer.add([
    runner(l, 0, { animation: { style, ...base } }),
    runner(l, 1, { animation: { style, ...base, attrs: ['x'] } }),
  ]);
  return stage.dispose;
};

export default mount;
