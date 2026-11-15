// LineUtil.simplify: Douglas-Peucker with a pixel tolerance, the step Leaflet applies to every polyline
import { LineUtil, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, createPlane, DIM, GREEN, ORANGE } from '../../shared/plane.ts';

const VIEW = [0, 0, 400, 200] as const;

/** A wiggly line made from a few sine waves: the same every time. */
const LINE = Array.from({ length: 90 }, (_, i) => new Point(10 + i * 4.3, 100 + 40 * Math.sin(i * 0.17) + 14 * Math.sin(i * 0.71) + 5 * Math.sin(i * 2.3)));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The grey line has 90 points. A larger tolerance (in pixels) drops every point that stays within it of the straight line between the kept ones.' });
  const plane = createPlane(stage, VIEW);
  plane.base.poly(LINE, { stroke: DIM, width: 1 });

  const draw = (tolerance: number): void => {
    plane.clear();
    const simple = LineUtil.simplify(LINE, tolerance);
    plane.live.poly(simple, { stroke: GREEN, width: 2 });
    for (const p of simple) plane.live.dot(p, { fill: ORANGE, r: 2.5 });
    stage.say(`simplify(points, ${tolerance.toFixed(1)}) keeps ${simple.length} of ${LINE.length} points`);
  };
  draw(3);
  stage.slider('tolerance', 0, 30, 0.5, 3, draw);
  if (stage.preview) animate(stage, (t) => draw(1 + 14 * (0.5 - 0.5 * Math.cos(t * 0.8))));
  return () => stage.dispose();
};

export default mount;
