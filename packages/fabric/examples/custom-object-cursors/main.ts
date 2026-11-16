// hoverCursor and moveCursor on single objects override the canvas defaults
import { Canvas, Circle, Point, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { caption, rememberPose } from '../../shared/custom.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const HOVER = ['pointer', 'help', 'zoom-in', 'crosshair', 'grab', 'not-allowed'];
const MOVE = ['grabbing', 'move', 'all-scroll', 'copy', 'wait'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Move the real pointer over each shape, then drag it. Each one answers with its own cursor; the empty canvas keeps the canvas default.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const base = { top: 100, hasControls: false };
  const rect = new Rect({ ...base, left: 80, width: 70, height: 70, fill: '#e94b3c', hoverCursor: 'pointer', moveCursor: 'grabbing' });
  const circle = new Circle({ ...base, left: 180, radius: 36, fill: '#3b7dd8', hoverCursor: 'help', moveCursor: 'move' });
  const tri = new Triangle({ ...base, left: 280, width: 74, height: 70, fill: '#2e9e5b', hoverCursor: 'zoom-in', moveCursor: 'all-scroll' });
  const shapes: FabricObject[] = [rect, circle, tri];
  const names = ['rect', 'circle', 'triangle'];
  canvas.add(...shapes, ...shapes.map((s, i) => caption(names[i]!, s.left, 160)));
  const reset = rememberPose(shapes);

  // fabric writes the cursor it picked to the upper canvas element on every pointer move.
  stage.loop(() => say(`cursor now: ${canvas.upperCanvasEl.style.cursor || 'default'}`));

  if (stage.bar) {
    shapes.forEach((s, i) => {
      select(stage.bar!, `${names[i]} hoverCursor`, HOVER, (v) => (s.hoverCursor = v), s.hoverCursor ?? 'pointer');
      select(stage.bar!, 'moveCursor', MOVE, (v) => (s.moveCursor = v), s.moveCursor ?? 'move');
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const s of shapes) {
        const c = s.getCenterPoint();
        await ghost.move(c, 450);
        await stage.wait(400);
        await ghost.dragTo(c.add(new Point(0, 25)), 450);
      }
      await ghost.move(new Point(180, 205), 450);
      await stage.wait(600);
      reset();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
