// calcAngleBetweenVectors, dotProduct, crossProduct, isBetweenVectors
import { Canvas, Point, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { BLUE, GREEN, RED, arrow, at, drift, handle, label, n1, overlay, put } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag P (blue), Q (red) and T (green). The angle from a to b is signed (radians, converted with radiansToDegrees); dotProduct is positive under 90°, crossProduct flips sign with the turn direction; isBetweenVectors says whether T lies in the wedge from a to b.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const O = { x: 130, y: 120 };
  const P = handle(230, 90, BLUE);
  const Q = handle(190, 190, RED);
  const T = handle(240, 150, GREEN);
  canvas.add(P, Q, T);

  overlay(canvas, (c) => {
    const origin = new Point(O.x, O.y);
    const a = util.createVector(origin, at(P));
    const b = util.createVector(origin, at(Q));
    const t = util.createVector(origin, at(T));
    const ang = util.calcAngleBetweenVectors(a, b);
    const inside = util.isBetweenVectors(t, a, b);
    // the wedge from a to b, filled gold when T is inside
    const a0 = util.calcVectorRotation(a);
    c.fillStyle = inside ? 'rgba(217,154,28,0.3)' : 'rgba(0,0,0,0.06)';
    c.beginPath();
    c.moveTo(origin.x, origin.y);
    c.arc(origin.x, origin.y, 46, a0, a0 + ang, ang < 0);
    c.closePath();
    c.fill();
    arrow(c, origin, at(P), BLUE, 3);
    arrow(c, origin, at(Q), RED, 3);
    arrow(c, origin, at(T), GREEN, 2);
    label(c, 'a', at(P), BLUE);
    label(c, 'b', at(Q), RED);
    label(c, 'T', at(T), GREEN);
    say(`angle ${n1(util.radiansToDegrees(ang))}° (${ang.toFixed(2)} rad)\ndot ${n1(util.dotProduct(a, b))}  cross ${n1(util.crossProduct(a, b))}\nT between a and b: ${inside}`);
  });

  const redraw = (): void => {
    for (const h of [P, Q, T]) h.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);
  if (stage.preview)
    stage.loop((_dt, t) => {
      put(Q, drift(t, 190, 130, 50, 60, 0.7));
      put(T, drift(t, 220, 130, 30, 40, 1.1, 2));
      canvas.requestRenderAll();
    });
  return stage.dispose;
};

export default mount;
