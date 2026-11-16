// AligningGuidelines: snap lines while a shape is dragged
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import { AligningGuidelines } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag a shape near the edges or centres of the others: red guide lines show the match and the shape snaps to it. Scaling a corner aligns the edge you pull, too.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const a = new Rect({ left: 70, top: 60, width: 70, height: 44, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 });
  const b = new Rect({ left: 230, top: 160, width: 90, height: 50, fill: '#d6f0e0', stroke: '#2e9e5b', strokeWidth: 2 });
  const c = new Circle({ left: 250, top: 60, radius: 24, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 2 });
  const d = new Triangle({ left: 90, top: 165, width: 56, height: 50, fill: '#ffe9a8', stroke: '#d99a1c', strokeWidth: 2 });
  canvas.add(a, b, c, d);

  // one call turns it on; dispose() takes the listeners off again
  const guides = new AligningGuidelines(canvas);
  stage.onDispose(() => guides.dispose());

  if (stage.bar) {
    checkbox(stage.bar, 'closeVLine (no vertical lines)', false, (v) => (guides.closeVLine = v));
    checkbox(stage.bar, 'closeHLine (no horizontal lines)', false, (v) => (guides.closeHLine = v));
  } else {
    const g = stage.ghost(canvas);
    stage.repeat(async () => {
      c.set({ left: 250, top: 60 });
      c.setCoords();
      canvas.requestRenderAll();
      await g.drag({ x: 250, y: 60 }, { x: 74, y: 120 }, 1300);
      await stage.wait(500);
      await g.dragTo({ x: 150, y: 165 }, 1000);
      await stage.wait(500);
      await g.dragTo({ x: 232, y: 112 }, 900);
      await stage.wait(700);
    }, 300);
  }
  return stage.dispose;
};

export default mount;
