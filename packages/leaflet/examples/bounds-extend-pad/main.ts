// Bounds extend, pad, getCenter, getSize and the four corners
import { Bounds, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { BLUE, createPlane, GREEN, gridLines, ORANGE, YELLOW } from '../../shared/plane.ts';

const VIEW = [-10, -10, 260, 170] as const;
const POINTS = [new Point(60, 50), new Point(140, 40), new Point(110, 110), new Point(200, 90), new Point(30, 120)];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the plane to extend the bounds with that point. min is the top-left corner and max the bottom-right: y grows downward in pixels.' });
  const plane = createPlane(stage, VIEW);
  gridLines(plane.base, VIEW, 10);

  let bounds = new Bounds();
  let ratio = 0.2;
  const pts: Point[] = [];
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    for (const p of pts) d.dot(p, { fill: YELLOW, r: 2.5 });
    if (!bounds.isValid()) {
      stage.say('new Bounds(): empty, isValid() false');
      return;
    }
    const pad = bounds.pad(ratio);
    d.rect(pad.min, pad.max, { stroke: ORANGE, dash: '4 3', width: 1.5 });
    d.rect(bounds.min, bounds.max, { stroke: GREEN, fill: GREEN, opacity: 0.18, width: 2 });
    d.dot(bounds.getCenter(), { fill: BLUE, r: 3 });
    d.text(bounds.getTopLeft().add([3, -3]), `min ${bounds.min.toString()}`, { fill: GREEN, size: 7 });
    d.text(bounds.getBottomRight().add([-3, 9]), `max ${bounds.max.toString()}`, { fill: GREEN, size: 7, anchor: 'end' });
    stage.say(`size ${bounds.getSize().toString()}, center ${bounds.getCenter().toString()}, bottom-left ${bounds.getBottomLeft().toString()}, pad(${ratio}) dashed`);
  };
  const extend = (p: Point): void => {
    pts.push(p);
    bounds.extend(p);
    draw();
  };
  const reset = (): void => {
    bounds = new Bounds();
    pts.length = 0;
    draw();
  };
  plane.svg.addEventListener('click', (e) => {
    const ctm = plane.svg.getScreenCTM();
    if (!ctm) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    extend(new Point(Math.round(pt.x), Math.round(pt.y)));
  }, { signal: stage.signal });
  stage.slider('pad ratio', -0.4, 1, 0.05, ratio, (v) => { ratio = v; draw(); });
  stage.button('Reset', reset);
  draw();

  if (stage.preview) {
    let i = 0;
    stage.every(1300, () => {
      if (i < POINTS.length) extend(POINTS[i++] as Point);
      else {
        i = 0;
        reset();
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
