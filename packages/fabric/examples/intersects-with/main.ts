// Objects: intersectsWithObject() and isContainedWithinObject() compare two objects' rotated boxes
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'Drag the circle. The target turns red while the two intersect and green when the circle is completely inside it.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const target = new Rect({ left: 170, top: 100, width: 130, height: 110, angle: 12, fill: '#cfd8e6', stroke: '#3b7dd8', strokeWidth: 2, selectable: false, evented: false });
  const mover = new Circle({ left: 50, top: 100, radius: 22, fill: '#8e5bd6', hasControls: false });
  canvas.add(target, mover);

  const test = (): void => {
    const touching = mover.intersectsWithObject(target);
    const inside = mover.isContainedWithinObject(target);
    target.set('fill', inside ? '#a8e0bc' : touching ? '#f2a39a' : '#cfd8e6');
    say(`intersectsWithObject ${touching}\nisContainedWithinObject ${inside}`);
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', test);
  test();

  if (stage.preview) {
    stage.loop((_dt, t) => {
      mover.set({ left: 150 + 120 * Math.sin(t * 0.8), top: 100 + 25 * Math.sin(t * 1.9) });
      mover.setCoords();
      test();
    });
  }

  return stage.dispose;
};

export default mount;
