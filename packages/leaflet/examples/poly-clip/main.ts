// PolyUtil.clipPolygon (Sutherland-Hodgman) cuts a polygon to a rectangle and keeps it closed
import { Bounds, Point, PolyUtil } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, DIM, GREEN, ORANGE } from '../../shared/plane.ts';

const VIEW = [0, 0, 400, 240] as const;

/** A star around (200, 120) with ten vertices, turned by `turn` radians. */
const star = (turn: number): Point[] =>
  Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? 55 : 125;
    const a = turn + (i * Math.PI) / 5;
    return new Point(200 + r * Math.cos(a), 120 + r * Math.sin(a));
  });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed star is the polygon; the green shape is clipPolygon(points, bounds). Its points run along the rectangle\'s edges where the star was cut.' });
  const plane = createPlane(stage, VIEW);
  const clip = new Bounds([120, 60], [290, 190]);
  plane.base.rect(clip.min, clip.max, { stroke: BLUE, width: 2 });

  const draw = (turn: number): void => {
    plane.clear();
    const points = star(turn);
    const clipped = PolyUtil.clipPolygon(points, clip, true);
    plane.live.poly(points, { stroke: DIM, dash: '4 3', close: true });
    plane.live.poly(clipped, { stroke: GREEN, fill: GREEN, opacity: 0.4, width: 2, close: true });
    for (const p of clipped) plane.live.dot(p, { fill: ORANGE, r: 2.5 });
    stage.say(`${points.length} points in, ${clipped.length} points out`);
  };
  draw(0);
  stage.slider('turn', 0, 6.3, 0.05, 0, draw);
  if (stage.preview) animate(stage, (t) => draw(t * 0.4));
  return () => stage.dispose();
};

export default mount;
