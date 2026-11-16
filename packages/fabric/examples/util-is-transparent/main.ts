// util.isTransparent reads a pixel of the canvas with a tolerance square
import { Canvas, Circle, FabricText, Point, Triangle, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { GREEN, RED, drift } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Move the pointer over the canvas. isTransparent(ctx, x, y, tolerance) is true when every pixel in the (2·tolerance+1) square around x, y has alpha 0. It is how fabric tells whether a click hit an object\'s shape or only its box.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true, renderOnAddRemove: false }));
  const say = briefStatus(stage);
  canvas.add(
    new Circle({ left: 80, top: 105, radius: 55, fill: 'transparent', stroke: '#3b7dd8', strokeWidth: 10 }),
    new Triangle({ left: 190, top: 120, width: 80, height: 70, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 3 }),
    new FabricText('Fab', { left: 255, top: 60, fontSize: 40, fontFamily: 'sans-serif', fill: '#2e9e5b', fontWeight: 'bold' }),
  );
  canvas.renderAll();

  const o = { tolerance: 0, at: new Point(80, 105) };
  canvas.on('mouse:move', ({ scenePoint }) => {
    o.at = scenePoint;
    canvas.requestRenderAll();
  });
  // read first, draw the probe afterwards: the probe must not land in the pixels it reads
  canvas.on('after:render', ({ ctx: c }) => {
    const dpr = canvas.getRetinaScaling();
    const device = o.at.transform(canvas.viewportTransform).scalarMultiply(dpr);
    const x = Math.round(device.x);
    const y = Math.round(device.y);
    const clear = util.isTransparent(canvas.getContext(), x, y, o.tolerance * dpr);
    c.save();
    c.transform(...canvas.viewportTransform);
    const r = o.tolerance + 0.5;
    c.strokeStyle = clear ? RED : GREEN;
    c.lineWidth = 1.5;
    c.strokeRect(o.at.x - r, o.at.y - r, r * 2, r * 2);
    c.beginPath();
    c.moveTo(o.at.x - 10, o.at.y);
    c.lineTo(o.at.x + 10, o.at.y);
    c.moveTo(o.at.x, o.at.y - 10);
    c.lineTo(o.at.x, o.at.y + 10);
    c.stroke();
    c.restore();
    say(`isTransparent → ${clear}\ntolerance ${o.tolerance}`);
  });
  canvas.requestRenderAll();

  if (stage.bar) slider(stage.bar, 'tolerance', 0, 12, 1, 0, (v) => ((o.tolerance = v), canvas.requestRenderAll()));
  else
    stage.loop((_dt, t) => {
      o.at = drift(t, 160, 110, 130, 70, 0.7);
      o.tolerance = Math.floor(t / 4) % 2 ? 6 : 0;
      canvas.requestRenderAll();
    });
  return stage.dispose;
};

export default mount;
