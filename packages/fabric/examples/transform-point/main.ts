// Transformations: transformPoint carries a grid of object-space points through calcTransformMatrix
import { Canvas, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The dots are points of the rectangle\'s own plane (a grid around its centre), sent to the canvas with util.transformPoint. Move or rotate the rectangle.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 120, width: 140, height: 90, fill: '#3b7dd833', stroke: '#3b7dd8', strokeWidth: 1, angle: 20, skewX: 10 });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const grid: Point[] = [];
  for (let x = -60; x <= 60; x += 30) for (let y = -30; y <= 30; y += 30) grid.push(new Point(x, y));
  canvas.on('after:render', ({ ctx: c }) => {
    const m = rect.calcTransformMatrix();
    c.save();
    c.transform(...canvas.viewportTransform); // the after:render context is not transformed
    grid.forEach((p, i) => {
      const q = util.transformPoint(p, m);
      c.fillStyle = i === 7 ? '#e94b3c' : '#2b2a33';
      c.beginPath();
      c.arc(q.x, q.y, i === 7 ? 4.5 : 3, 0, Math.PI * 2);
      c.fill();
    });
    c.restore();
    const p = grid[0]!;
    const q = util.transformPoint(p, m);
    say(`object (${p.x}, ${p.y}) -> canvas (${q.x.toFixed(0)}, ${q.y.toFixed(0)})${stage.preview ? '' : `; Point#transform gives ${p.transform(m).x.toFixed(0)}, ${p.transform(m).y.toFixed(0)}`}`);
  });
  canvas.requestRenderAll();

  if (stage.bar) slider(stage.bar, 'angle', -180, 180, 1, 20, (v) => { rect.rotate(v); rect.setCoords(); canvas.requestRenderAll(); }, (v) => `${v}°`);
  else stage.loop((_dt, t) => { rect.rotate(20 + Math.sin(t) * 50); rect.set({ left: 170 + Math.sin(t * 0.7) * 40 }); canvas.requestRenderAll(); });
  return stage.dispose;
};

export default mount;
