// Point round, floor, ceil and trunc differ for negative and half values
import { Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, gridLines, ORANGE, orbit, PINK, YELLOW } from '../../shared/plane.ts';

const VIEW = [-4.5, -3.5, 9, 7] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each cell is one pixel. Drag the sliders (or watch the card) and compare where the four results land: floor goes down and ceil up, trunc goes towards zero, round to the nearest.' });
  const plane = createPlane(stage, VIEW);
  gridLines(plane.base, VIEW, 1);

  let p = new Point(2.6, -1.4);
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    const results = [
      ['round', p.round(), BLUE],
      ['floor', p.floor(), GREEN],
      ['ceil', p.ceil(), ORANGE],
      ['trunc', p.trunc(), PINK],
    ] as const;
    results.forEach(([name, q, color], i) => {
      d.line(p, q, { stroke: color, width: 1, dash: '3 3' });
      d.dot(q, { fill: color, r: 0.12 });
      if (!stage.preview) d.text({ x: q.x + (q.x >= p.x ? 0.16 : -0.16), y: q.y + (q.y >= p.y ? 0.38 : -0.16) }, name, { fill: color, size: 0.3, anchor: q.x >= p.x ? 'start' : 'end' });
      d.text({ x: -4.3, y: -2.95 + i * 0.4 }, `${name}  ${q.toString()}`, { fill: color, size: 0.32 });
    });
    d.dot(p, { fill: YELLOW, r: 0.15 });
    d.text({ x: -4.3, y: -2.95 + 4 * 0.4 }, `point  ${p.toString()}`, { fill: YELLOW, size: 0.32 });
    stage.say(`${p.toString()}: round ${results[0][1].toString()}, floor ${results[1][1].toString()}, ceil ${results[2][1].toString()}, trunc ${results[3][1].toString()}`);
  };
  stage.slider('x', -4, 4, 0.1, p.x, (v) => { p = new Point(v, p.y); draw(); });
  stage.slider('y', -3, 3, 0.1, p.y, (v) => { p = new Point(p.x, v); draw(); });
  draw();

  if (stage.preview) {
    animate(stage, (t) => {
      const o = orbit(0, 0, 3, 2, t * 0.6);
      p = new Point(Math.round(o.x * 10) / 10, Math.round(o.y * 10) / 10);
      draw();
    });
  }
  return () => stage.dispose();
};

export default mount;
