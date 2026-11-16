// Canvas: hoverCursor and moveCursor set the CSS cursor over objects and while dragging them
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Move the real pointer over a shape (hoverCursor), then drag it (moveCursor). The readout shows the cursor fabric last set.' });
  const canvas = stage.own(new Canvas(stage.el, { hoverCursor: 'pointer', moveCursor: 'grabbing' }));
  const say = status(stage);

  const rect = new Rect({ left: 100, top: 100, width: 80, height: 80, fill: '#3b7dd8', hasControls: false });
  canvas.add(rect, new Circle({ left: 200, top: 100, radius: 40, fill: '#e94b3c', hasControls: false }));

  // fabric writes the cursor to the upper canvas element's style as the pointer moves.
  stage.loop(() => say(`hover ${canvas.hoverCursor} · move ${canvas.moveCursor}\ncursor now: ${canvas.upperCanvasEl.style.cursor || 'default'}`));

  if (stage.bar) {
    select(stage.bar, 'hoverCursor', ['pointer', 'move', 'crosshair', 'grab', 'help', 'zoom-in'], (v) => (canvas.hoverCursor = v), 'pointer');
    select(stage.bar, 'moveCursor', ['grabbing', 'move', 'all-scroll', 'not-allowed'], (v) => (canvas.moveCursor = v), 'grabbing');
  } else {
    const ghost = stage.ghost(canvas);
    const hovers = ['pointer', 'crosshair', 'grab', 'help'];
    let i = 0;
    stage.repeat(async () => {
      canvas.hoverCursor = hovers[i++ % hovers.length]!;
      canvas.moveCursor = canvas.hoverCursor === 'grab' ? 'grabbing' : 'move';
      await ghost.move({ x: 100, y: 100 }, 500);
      await stage.wait(500);
      await ghost.dragTo({ x: 130, y: 120 }, 500);
      await ghost.move({ x: 100, y: 100 }, 400);
      rect.set({ left: 100, top: 100 });
      rect.setCoords();
      canvas.requestRenderAll();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
