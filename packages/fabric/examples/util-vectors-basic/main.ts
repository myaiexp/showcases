// Vector helpers: createVector, magnitude, getUnitVector, rotateVector
import { Canvas, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GREEN, RED, GOLD, arrow, at, drift, handle, label, n1, overlay, put } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag A or B. createVector(from, to) is to - from; magnitude is its length; getUnitVector scales it to length 1 (drawn 50 times longer); getOrthonormalVector turns it a quarter turn; rotateVector turns it by any angle.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const A = handle(100, 140, BLUE);
  const B = handle(220, 90, RED);
  canvas.add(A, B);
  const o = { deg: 45 };

  overlay(canvas, (c) => {
    const v = util.createVector(at(A), at(B));
    const unit = util.getUnitVector(v);
    const ortho = util.getOrthonormalVector(v);
    const turned = util.rotateVector(v, util.degreesToRadians(o.deg));
    arrow(c, at(A), at(B), '#555', 3);
    arrow(c, at(A), at(A).add(unit.scalarMultiply(50)), GREEN, 3);
    arrow(c, at(A), at(A).add(ortho.scalarMultiply(50)), GOLD, 3);
    arrow(c, at(A), at(A).add(turned), BLUE, 2);
    label(c, 'v', at(B), '#555');
    label(c, 'unit', at(A).add(unit.scalarMultiply(50)), GREEN, 11);
    label(c, 'ortho', at(A).add(ortho.scalarMultiply(50)), '#8a5f00', 11);
    label(c, `rotate ${o.deg}°`, at(A).add(turned), BLUE, 11);
    say(`v = (${n1(v.x)}, ${n1(v.y)})\nmagnitude ${n1(util.magnitude(v))}`);
  });

  const redraw = (): void => {
    A.setCoords();
    B.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);
  if (stage.bar) slider(stage.bar, 'rotateVector', -180, 180, 5, o.deg, (v) => ((o.deg = v), redraw()), (v) => `${v}°`);
  else
    stage.loop((_dt, t) => {
      put(B, drift(t, 200, 110, 50, 35, 0.8));
      o.deg = Math.round(60 * Math.sin(t * 0.7));
      canvas.requestRenderAll();
    });
  return stage.dispose;
};

export default mount;
