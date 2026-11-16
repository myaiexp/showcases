// selection false turns off the drag-to-select marquee
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Drag on empty space around the shapes: with selection on you get a marquee and a group; off, nothing. Clicking a single object still works.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  canvas.add(
    new Rect({ left: 90, top: 100, width: 60, height: 60, fill: '#e94b3c' }),
    new Circle({ left: 170, top: 100, radius: 30, fill: '#3b7dd8' }),
    new Triangle({ left: 240, top: 100, width: 60, height: 60, fill: '#2e9e5b' }),
  );

  const report = (): void => {
    const sel = canvas.getActiveObjects();
    say(`selection ${canvas.selection} · selected ${sel.length}`);
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) checkbox(stage.bar, 'selection', true, (v) => ((canvas.selection = v), canvas.discardActiveObject(), report()));
  else {
    const ghost = stage.ghost(canvas);
    let on = true;
    stage.repeat(async () => {
      canvas.selection = on;
      canvas.discardActiveObject();
      report();
      await ghost.drag({ x: 35, y: 30 }, { x: 275, y: 170 }, 900);
      await stage.wait(700);
      on = !on;
    }, 300);
  }

  return stage.dispose;
};

export default mount;
