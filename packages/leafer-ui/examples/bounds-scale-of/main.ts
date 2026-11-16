// Bounds: three ways to scale the same box
import { Bounds, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, outlineOf, pin } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey: the original. Red scale(k) runs away from the corner (0, 0), green scale(k, k, true) keeps x and y, blue scaleOf(centre, k) grows in place.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const base = new Bounds(stage.width * 0.3, stage.height * 0.35, stage.width * 0.22, stage.height * 0.22);
  outlineOf(leafer, '#bbb').set(cornersOf(base));
  const red = outlineOf(leafer, '#ff4b4b');
  const green = outlineOf(leafer, '#32cd79');
  const blue = outlineOf(leafer, '#4B8BFF');
  pin(leafer, '#444', 4).set({ x: 0, y: 0 }, '(0, 0)');
  const origin = pin(leafer, '#4B8BFF', 4);
  const say = label(stage, '', true);
  origin.set(base.getPoint('center'));

  drive(stage, 'k', [0.5, 1.6, 0.05], 1, (k) => {
    red.set(cornersOf(base.clone().scale(k)));
    green.set(cornersOf(base.clone().scale(k, k, true)));
    blue.set(cornersOf(base.clone().scaleOf(base.getPoint('center'), k)));
    say(`k = ${k.toFixed(2)}`);
  }, 6);
  return stage.dispose;
};

export default mount;
