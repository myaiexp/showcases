// Intersection.intersectPolygonPolygon and isPointInPolygon
import { Canvas, Intersection, Point, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { BLUE, GOLD, RED, at, dot, handle, label, overlay, poly, put } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag the two centre dots. intersectPolygonPolygon lists the points where the outlines cross; isPointInPolygon tells whether one shape\'s centre sits inside the other (this is not the same as the outlines crossing).',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const ca = handle(110, 110, BLUE);
  const cb = handle(185, 125, RED);
  canvas.add(ca, cb);
  let t = 0;

  const rect = (c: Point, w: number, h: number, deg: number): Point[] =>
    [new Point(-w, -h), new Point(w, -h), new Point(w, h), new Point(-w, h)].map((p) =>
      p.rotate(util.degreesToRadians(deg)).add(c),
    );
  const tri = (c: Point, r: number, deg: number): Point[] =>
    [0, 120, 240].map((d) => new Point(r, 0).rotate(util.degreesToRadians(d + deg - 90)).add(c));

  overlay(canvas, (c) => {
    const A = rect(at(ca), 55, 38, t * 12);
    const B = tri(at(cb), 62, -t * 18);
    poly(c, A, BLUE, 'rgba(59,125,216,0.15)');
    poly(c, B, RED, 'rgba(233,75,60,0.15)');
    const hit = Intersection.intersectPolygonPolygon(A, B);
    hit.points.forEach((p) => dot(c, p, GOLD, 6));
    const aInB = Intersection.isPointInPolygon(at(ca), B);
    const bInA = Intersection.isPointInPolygon(at(cb), A);
    label(c, aInB ? 'inside red' : '', at(ca), BLUE);
    label(c, bInA ? 'inside blue' : '', at(cb), RED);
    say(`${hit.points.length} crossing(s), ${hit.status ?? 'none'}\ncentres: blue in red ${aInB}, red in blue ${bInA}`);
  });

  const redraw = (): void => {
    ca.setCoords();
    cb.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);
  stage.loop((dt, time) => {
    t = time;
    if (stage.preview) put(cb, new Point(160 + 90 * Math.sin(time * 0.8), 120 + 20 * Math.sin(time * 1.1)));
    canvas.requestRenderAll();
    void dt;
  });
  return stage.dispose;
};

export default mount;
