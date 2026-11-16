// Intersection.intersectLinePolygon against a spinning polygon
import { Canvas, Intersection, Point, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { BLUE, GOLD, GREEN, at, dot, drift, handle, label, overlay, poly, pt, put, seg } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag the two blue dots. intersectLinePolygon (infinite: true) cuts the polygon with the whole line; with infinite: false it is intersectSegmentPolygon and only the part between the dots counts.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const a = handle(40, 60, BLUE);
  const b = handle(130, 140, BLUE);
  canvas.add(a, b);
  const o = { infinite: true };
  let spin = 0;

  const shape = (): Point[] =>
    [new Point(-55, -35), new Point(60, -45), new Point(80, 30), new Point(0, 60), new Point(-70, 25)].map((p) =>
      p.rotate(util.degreesToRadians(spin)).add(new Point(210, 110)),
    );

  overlay(canvas, (c) => {
    const pts = shape();
    const [p1, p2] = [at(a), at(b)];
    poly(c, pts, GREEN, 'rgba(46,158,91,0.15)');
    const dir = util.getUnitVector(util.createVector(p1, p2));
    seg(c, o.infinite ? p1.subtract(dir.scalarMultiply(600)) : p1, o.infinite ? p2.add(dir.scalarMultiply(600)) : p2, BLUE, 2.5);
    const hit = Intersection.intersectLinePolygon(p1, p2, pts, o.infinite);
    for (const p of hit.points) {
      dot(c, p, GOLD, 6);
      label(c, pt(p), p, '#8a5f00', 11);
    }
    say(`infinite: ${o.infinite}\n${hit.points.length} point(s), status ${hit.status ?? 'none'}`);
  });

  const redraw = (): void => {
    a.setCoords();
    b.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);
  stage.loop((_dt, t) => {
    spin = (t * 20) % 360;
    if (stage.preview) {
      put(a, drift(t, 70, 90, 30, 30, 0.9));
      put(b, drift(t, 160, 140, 30, 25, 0.7, 1));
    }
    canvas.requestRenderAll();
  });
  if (stage.bar) checkbox(stage.bar, 'infinite (line, not segment)', true, (v) => ((o.infinite = v), redraw()));
  else stage.every(2400, () => (o.infinite = !o.infinite));
  return stage.dispose;
};

export default mount;
