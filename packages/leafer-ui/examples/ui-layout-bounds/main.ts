// UI: the four corners of the oriented box
import { Ellipse, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the skew to bend the box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.55;
  const rect = new Rect({ x: stage.width / 2, y: stage.height / 2 - 8, width: S, height: S * 0.7, fill: '#FEB027', around: 'center' });
  const dots = [0, 1, 2, 3].map((i) => new Ellipse({ width: 10, height: 10, fill: ['#FF4B4B', '#32cd79', '#4B8BFF', '#b05cff'][i], hittable: false }));
  leafer.add([rect, ...dots]);
  const state = { skew: 0 };
  stage.loop((_dt, t) => {
    rect.rotation = (t * 30) % 360;
    rect.skewX = state.skew;
    rect.getLayoutPoints('box', leafer).forEach((p, i) => dots[i]!.set({ x: p.x - 5, y: p.y - 5 }));
  });
  if (stage.bar) slider(stage.bar, 'skewX', -40, 40, 1, 0, (v) => (state.skew = v));
  else stage.every(2000, () => (state.skew = state.skew ? 0 : 25));

  return stage.dispose;
};

export default mount;
