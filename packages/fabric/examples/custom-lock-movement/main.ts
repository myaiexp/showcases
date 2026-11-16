// Customization: lockMovementX and lockMovementY pin an object to one axis or hold it still
import { Canvas, Circle, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { caption, rememberPose } from '../../shared/custom.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag each shape diagonally. The rectangle only moves up and down, the circle only left and right, the triangle not at all.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'drag the shapes');

  const rect = new Rect({ left: 80, top: 110, width: 70, height: 70, fill: '#e94b3c', hasControls: false, lockMovementX: true });
  const circle = new Circle({ left: 180, top: 110, radius: 36, fill: '#3b7dd8', hasControls: false, lockMovementY: true });
  const tri = new Triangle({ left: 280, top: 110, width: 74, height: 70, fill: '#2e9e5b', hasControls: false, lockMovementX: true, lockMovementY: true });
  canvas.add(rect, circle, tri, caption('lockMovementX', 80, 170), caption('lockMovementY', 180, 170), caption('both locked', 280, 170));
  const reset = rememberPose([rect, circle, tri]);

  canvas.on('object:moving', ({ target }) => say(`${target.type} at ${Math.round(target.left)}, ${Math.round(target.top)}`));

  if (stage.bar) {
    for (const [name, o] of [['rect', rect], ['circle', circle], ['triangle', tri]] as const) {
      checkbox(stage.bar, `${name} lockMovementX`, o.lockMovementX, (v) => (o.lockMovementX = v));
      checkbox(stage.bar, `${name} lockMovementY`, o.lockMovementY, (v) => (o.lockMovementY = v));
    }
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const o of [rect, circle, tri]) {
        const c = o.getCenterPoint();
        await ghost.drag(c, c.add(new Point(35, 30)), 550);
      }
      await stage.wait(900);
      reset();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
