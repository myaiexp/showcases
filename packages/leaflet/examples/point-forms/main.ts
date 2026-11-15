// Point input forms, Point.validate, round on creation, and contains, which compares absolute values
import { Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, gridLines, ORANGE, orbit } from '../../shared/plane.ts';

const VIEW = [-100, -80, 200, 160] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'a.contains(b) is true when each coordinate of b is no larger than a\'s in absolute value, so the box below is mirrored around the origin. Green when inside.' });
  const plane = createPlane(stage, VIEW);
  gridLines(plane.base, VIEW, 20);

  const rows = [
    `new Point(3, 4)\n  ${new Point(3, 4).toString()}`,
    `new Point([3, 4])\n  ${new Point([3, 4]).toString()}`,
    `new Point({x: 3, y: 4})\n  ${new Point({ x: 3, y: 4 }).toString()}`,
    `new Point('3', '4')\n  ${new Point('3' as unknown as number, '4' as unknown as number).toString()}`,
    `new Point(2.5, 3.6, true)\n  ${new Point(2.5, 3.6, true).toString()}`,
    `Point.validate(3, 4) ${String(Point.validate(3, 4))}   Point.validate(NaN, 4) ${String(Point.validate(Number.NaN, 4))}`,
    `new Point(3, 4).distanceTo([0, 0])\n  ${new Point(3, 4).distanceTo([0, 0])}`,
    `new Point(3, 4).equals([3, 4])\n  ${String(new Point(3, 4).equals([3, 4]))}`,
  ];
  const pre = stage.side('Point forms');
  if (pre) pre.textContent = rows.join('\n');

  const a = new Point(60, -40);
  let b = new Point(-30, 20);
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    const inside = a.contains(b);
    d.rect({ x: -Math.abs(a.x), y: -Math.abs(a.y) }, { x: Math.abs(a.x), y: Math.abs(a.y) }, { stroke: BLUE, fill: BLUE, opacity: 0.18, width: 1.5 });
    d.dot(a, { fill: BLUE, r: 3 });
    d.text({ x: a.x - 4, y: a.y - 4 }, `a ${a.toString()}`, { fill: BLUE, size: 8, anchor: 'end' });
    d.dot(b, { fill: inside ? GREEN : ORANGE, r: 3 });
    d.text({ x: b.x + (b.x > 0 ? -4 : 4), y: b.y - 4 }, `b ${b.toString()}`, { fill: inside ? GREEN : ORANGE, size: 8, anchor: b.x > 0 ? 'end' : 'start' });
    stage.say(`a.contains(b) is ${String(inside)}`);
  };
  stage.slider('b.x', -90, 90, 2, b.x, (v) => { b = new Point(v, b.y); draw(); });
  stage.slider('b.y', -70, 70, 2, b.y, (v) => { b = new Point(b.x, v); draw(); });
  draw();

  if (stage.preview) {
    animate(stage, (t) => {
      const o = orbit(0, 0, 85, 50, t * 0.7);
      b = new Point(Math.round(o.x), Math.round(o.y));
      draw();
    });
  }
  return () => stage.dispose();
};

export default mount;
