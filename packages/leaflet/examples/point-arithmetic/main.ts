// Point add, subtract, multiplyBy and divideBy: each returns a new point
import { Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, gridLines, ORANGE, orbit } from '../../shared/plane.ts';

type Op = 'add' | 'subtract' | 'multiplyBy' | 'divideBy';
const VIEW = [-20, -20, 260, 210] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue point a and green point b are fixed unless you move them. Each method returns a new point and leaves a and b as they were; y grows downward, as on the screen.' });
  const plane = createPlane(stage, VIEW);
  gridLines(plane.base, VIEW, 20);

  let op: Op = 'add';
  let a = new Point(60, 40);
  let b = new Point(100, 90);
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    const result: Point = op === 'add' ? a.add(b) : op === 'subtract' ? b.subtract(a) : op === 'multiplyBy' ? a.multiplyBy(2) : b.divideBy(2);
    const origin = new Point(0, 0);
    d.arrow(origin, a, { stroke: BLUE, width: 2 });
    d.arrow(origin, b, { stroke: GREEN, width: 2 });
    if (op === 'subtract') d.arrow(a, b, { stroke: ORANGE, width: 1.5, dash: '4 3' });
    d.arrow(origin, result, { stroke: ORANGE, width: 2.5 });
    d.dot(result, { fill: ORANGE, r: 4 });
    d.text(a, ` a ${a.toString()}`, { fill: BLUE });
    d.text(b, ` b ${b.toString()}`, { fill: GREEN });
    const code = op === 'add' ? 'a.add(b)' : op === 'subtract' ? 'b.subtract(a)' : op === 'multiplyBy' ? 'a.multiplyBy(2)' : 'b.divideBy(2)';
    d.text({ x: result.x, y: result.y + 14 }, `${code} = ${result.toString()}`, { fill: ORANGE, anchor: result.x > 150 ? 'end' : 'start' });
    stage.say(`${code} = ${result.toString()}`);
  };

  stage.select('Method', (['add', 'subtract', 'multiplyBy', 'divideBy'] as const).map((v) => ({ value: v, label: v })), op, (v) => { op = v; draw(); });
  stage.slider('b.x', 0, 200, 5, b.x, (v) => { b = new Point(v, b.y); draw(); });
  stage.slider('b.y', 0, 160, 5, b.y, (v) => { b = new Point(b.x, v); draw(); });
  draw();

  if (stage.preview) {
    const ops: Op[] = ['add', 'subtract', 'multiplyBy', 'divideBy'];
    animate(stage, (t) => {
      const p = orbit(100, 80, 40, 30, t);
      b = new Point(Math.round(p.x), Math.round(p.y));
      op = ops[Math.floor(t / 3.5) % ops.length] as Op;
      draw();
    });
  }
  return () => stage.dispose();
};

export default mount;
