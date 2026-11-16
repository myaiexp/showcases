// Ellipse: a pie chart from startAngle and endAngle
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle donut to set innerRadius on every slice.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 1.1;
  const values = [30, 20, 25, 25];
  const colors = ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'];
  const total = values.reduce((a, b) => a + b, 0);
  let angle = -180;
  const slices = values.map((v, i) => {
    const sweep = (v / total) * 360;
    const slice = new Ellipse({ ...mid(stage, S), width: S, height: S, startAngle: angle, endAngle: angle + sweep - 2, fill: colors[i] });
    angle += sweep;
    return slice;
  });
  leafer.add(slices);
  toggle(stage, 'donut', false, (v) => slices.forEach((s) => (s.innerRadius = v ? 0.55 : 0)), 1600);
  stage.loop((_dt, t) => slices.forEach((s, i) => (s.scale = 1 + (Math.sin(t * 2 + i * 1.6) > 0.8 ? 0.05 : 0))));

  return stage.dispose;
};

export default mount;
