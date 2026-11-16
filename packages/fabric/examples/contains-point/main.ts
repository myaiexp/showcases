// Objects: containsPoint(point) tests a point against the object's rotated bounding box
import { Canvas, Circle, Point, Polygon } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'Drag the dot around. The star is tested with star.containsPoint(dot.getCenterPoint()), whose dashed outline is the rotated box, not the star edge itself.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const points = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? 80 : 34;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  });
  const star = new Polygon(points, { left: 150, top: 100, angle: 15, fill: '#f2b134', stroke: '#a8700a', strokeWidth: 2, selectable: false, evented: false });
  const dot = new Circle({ left: 60, top: 40, radius: 9, fill: '#3b2a8c', stroke: '#fff', strokeWidth: 2, hasControls: false, hasBorders: false });
  // containsPoint() tests the corners from getCoords(): the object's rotated box, which a dashed polygon shows.
  const hull = new Polygon(star.getCoords(), { fill: 'transparent', stroke: '#3b2a8c', strokeWidth: 1, strokeDashArray: [4, 4], selectable: false, evented: false, objectCaching: false });
  canvas.add(star, hull, dot);

  const test = (): void => {
    const inside = star.containsPoint(new Point(dot.getCenterPoint()));
    star.set('fill', inside ? '#2e9e5b' : '#f2b134');
    say(`containsPoint → ${inside}`);
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', test);
  test();

  if (stage.preview) {
    stage.loop((_dt, t) => {
      dot.set({ left: 150 + 105 * Math.cos(t * 0.9), top: 100 + 70 * Math.sin(t * 1.3) });
      dot.setCoords();
      test();
    });
  }

  return stage.dispose;
};

export default mount;
