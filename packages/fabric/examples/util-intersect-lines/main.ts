// Intersection.intersectLineLine on lines or segments, live
import { Canvas, Intersection, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { BLUE, GOLD, RED, at, dot, drift, handle, label, overlay, pt, put, seg } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag the four dots. intersectLineLine treats each pair as an infinite line (aInfinite / bInfinite true) or as a segment (false). Parallel and coincident lines come back with a status and no points.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const a1 = handle(60, 60, BLUE);
  const a2 = handle(190, 150, BLUE);
  const b1 = handle(70, 170, RED);
  const b2 = handle(150, 70, RED);
  canvas.add(a1, a2, b1, b2);
  const o = { aInfinite: true, bInfinite: true };

  overlay(canvas, (c) => {
    const [p1, p2, q1, q2] = [at(a1), at(a2), at(b1), at(b2)];
    // an infinite line is drawn far past both handles
    const draw = (u: typeof p1, v: typeof p2, inf: boolean, color: string): void => {
      const dir = util.getUnitVector(util.createVector(u, v));
      seg(c, inf ? u.subtract(dir.scalarMultiply(600)) : u, inf ? v.add(dir.scalarMultiply(600)) : v, color, 2.5, inf ? [] : []);
    };
    draw(p1, p2, o.aInfinite, BLUE);
    draw(q1, q2, o.bInfinite, RED);
    const hit = Intersection.intersectLineLine(p1, p2, q1, q2, o.aInfinite, o.bInfinite);
    for (const p of hit.points) {
      dot(c, p, GOLD, 7);
      label(c, pt(p), p, '#8a5f00');
    }
    say(`status: ${hit.status ?? 'none'}\npoints: ${hit.points.length ? hit.points.map(pt).join(' ') : '-'}`);
  });

  const redraw = (): void => {
    for (const h of [a1, a2, b1, b2]) h.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);

  if (stage.bar) {
    checkbox(stage.bar, 'aInfinite (blue)', true, (v) => ((o.aInfinite = v), redraw()));
    checkbox(stage.bar, 'bInfinite (red)', true, (v) => ((o.bInfinite = v), redraw()));
  } else {
    stage.every(2600, () => {
      o.aInfinite = !o.aInfinite;
      o.bInfinite = !o.bInfinite;
    });
    stage.loop((_dt, t) => {
      put(a2, drift(t, 190, 150, 40, 30, 0.8));
      put(b2, drift(t, 150, 70, 35, 30, 0.6, 1.5));
      canvas.requestRenderAll();
    });
  }
  return stage.dispose;
};

export default mount;
