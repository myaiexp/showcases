// getSmoothPathFromPoints() turns a list of points into a path of quadratic curves
import { Canvas, Circle, Path, Point, Polyline, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 200], hint: 'The grey zigzag joins the raw points; the red path is what getSmoothPathFromPoints() makes from the same points (the free-drawing brush uses it). The slider shakes the points.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const base = Array.from({ length: 11 }, (_, i) => ({ x: 25 + i * 27, y: 100 + 55 * Math.sin(i * 0.7) }));
  let drawn: (Polyline | Path | Circle)[] = [];
  const show = (shake: number, phase: number): void => {
    canvas.remove(...drawn);
    const points = base.map((p, i) => new Point(p.x, p.y + shake * Math.sin(phase + i * 2.3)));
    const smooth = new Path(util.getSmoothPathFromPoints(points), { fill: 'transparent', stroke: '#e94b3c', strokeWidth: 4, strokeLineCap: 'round' });
    const raw = new Polyline(points, { fill: 'transparent', stroke: '#9aa3b2', strokeWidth: 1, strokeDashArray: [3, 3] });
    const dots = points.map((p) => new Circle({ left: p.x, top: p.y, radius: 3, fill: '#3b2a8c' }));
    drawn = [raw, smooth, ...dots];
    for (const o of drawn) o.set({ selectable: false, evented: false });
    canvas.add(...drawn);
    say(`${points.length} points → ${smooth.path.length} commands`);
    canvas.requestRenderAll();
  };
  show(25, 0);
  if (stage.bar) slider(stage.bar, 'shake', 0, 60, 1, 25, (v) => show(v, 0));
  else stage.loop((_dt, t) => show(25 + 20 * Math.sin(t * 0.7), t * 2));

  return stage.dispose;
};

export default mount;
