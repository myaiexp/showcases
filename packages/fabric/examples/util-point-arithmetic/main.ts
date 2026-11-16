// Point methods drawn as vectors from an origin: add, subtract, rotate, lerp
import { Canvas, Point, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { BLUE, GOLD, GREEN, RED, arrow, at, dot, drift, handle, label, n1, overlay, pt, put, seg } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';
import { briefStatus } from '../../shared/code-panel.ts';

const OPS = ['add', 'subtract', 'scalarMultiply', 'multiply', 'rotate', 'lerp', 'midPointFrom', 'distanceFrom'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 240],
    hint: 'Drag the blue and red dots. Their positions from the origin are two Points; the gold one is the result of the chosen method.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const O = new Point(110, 150);
  const A = handle(O.x + 80, O.y - 60, BLUE);
  const B = handle(O.x + 40, O.y + 20, RED);
  canvas.add(A, B);

  const o = { op: 'add' as (typeof OPS)[number], k: 1.5, deg: 40, t: 0.5 };

  // The Points the methods work on: positions relative to the origin.
  const compute = (a: Point, b: Point): { result: Point | null; text: string } => {
    switch (o.op) {
      case 'add': return { result: a.add(b), text: 'a.add(b)' };
      case 'subtract': return { result: a.subtract(b), text: 'a.subtract(b)' };
      case 'scalarMultiply': return { result: a.scalarMultiply(o.k), text: `a.scalarMultiply(${o.k})` };
      case 'multiply': return { result: a.multiply(new Point(b.x / 40, b.y / 40)), text: 'a.multiply(b / 40)' };
      case 'rotate': return { result: a.rotate(util.degreesToRadians(o.deg)), text: `a.rotate(${o.deg} deg)` };
      case 'lerp': return { result: a.lerp(b, o.t), text: `a.lerp(b, ${o.t})` };
      case 'midPointFrom': return { result: a.midPointFrom(b), text: 'a.midPointFrom(b)' };
      case 'distanceFrom': return { result: null, text: `a.distanceFrom(b) = ${n1(a.distanceFrom(b))}` };
    }
  };

  overlay(canvas, (c) => {
    seg(c, new Point(0, O.y), new Point(320, O.y), '#cfc9bb', 1);
    seg(c, new Point(O.x, 0), new Point(O.x, 240), '#cfc9bb', 1);
    const a = at(A).subtract(O);
    const b = at(B).subtract(O);
    arrow(c, O, at(A), BLUE);
    arrow(c, O, at(B), RED);
    label(c, 'a', at(A), BLUE);
    label(c, 'b', at(B), RED);
    const { result, text } = compute(a, b);
    if (result) {
      const r = O.add(result);
      if (o.op === 'add' || o.op === 'subtract') seg(c, o.op === 'add' ? at(A) : at(B), r, '#bbb', 1.5, [4, 4]);
      arrow(c, O, r, GOLD, 3);
      dot(c, r, GOLD, 5);
      label(c, pt(result), r, '#8a5f00');
    } else {
      seg(c, at(A), at(B), GREEN, 3);
    }
    say(`${text}\na = ${pt(a)}  b = ${pt(b)}`);
  });

  const redraw = (): void => {
    A.setCoords();
    B.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);

  if (stage.bar) {
    select(stage.bar, 'method', OPS, (v) => ((o.op = v), redraw()));
    slider(stage.bar, 'k', -2, 3, 0.1, o.k, (v) => ((o.k = v), redraw()));
    slider(stage.bar, 'deg', -180, 180, 5, o.deg, (v) => ((o.deg = v), redraw()), (v) => `${v}°`);
    slider(stage.bar, 't', 0, 1.5, 0.05, o.t, (v) => ((o.t = v), redraw()));
  } else {
    let i = 0;
    stage.every(1600, () => ((o.op = OPS[++i % OPS.length]!), (o.t = 0.3 + 0.4 * (i % 2))));
    stage.loop((_dt, t) => {
      put(A, drift(t, O.x + 70, O.y - 45, 25, 20, 0.9));
      put(B, drift(t, O.x + 30, O.y + 25, 20, 15, 0.7, 2));
      canvas.requestRenderAll();
    });
  }
  return stage.dispose;
};

export default mount;
