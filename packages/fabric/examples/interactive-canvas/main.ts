// Canvas: objects on a fabric.Canvas can be selected, moved, scaled and rotated with no extra code
import { Canvas, Circle, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Click to select, drag to move, pull a corner to scale, the top handle to rotate. Drag on empty space for a group selection.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const rect = new Rect({ left: 90, top: 120, width: 80, height: 60, fill: '#e94b3c' });
  const circle = new Circle({ left: 190, top: 110, radius: 36, fill: '#3b7dd8' });
  const triangle = new Triangle({ left: 280, top: 125, width: 70, height: 70, fill: '#2e9e5b' });
  canvas.add(rect, circle, triangle);

  const say = status(stage, 'nothing selected');
  const report = (): void => {
    const o = canvas.getActiveObject();
    say(o ? `${o.type}: scale ${o.scaleX.toFixed(2)} · angle ${o.angle.toFixed(0)}°` : 'nothing selected');
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  canvas.on('object:modified', report);

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    // The rotate handle ('mtr') sits above the box; the corner 'br' at its bottom right.
    const handle = (name: string): Point => controlPoint(rect, name);
    stage.repeat(async () => {
      await ghost.click(rect.getCenterPoint());
      await ghost.drag(rect.getCenterPoint(), new Point(110, 90), 600);
      await ghost.drag(handle('br'), handle('br').add(new Point(30, 25)), 600);
      await ghost.drag(handle('mtr'), handle('mtr').add(new Point(45, 10)), 600);
      await stage.wait(500);
      rect.set({ left: 90, top: 120, scaleX: 1, scaleY: 1, angle: 0 });
      rect.setCoords();
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }, 900);
  }

  return stage.dispose;
};

export default mount;
