// Canvas: preserveObjectStacking false lifts the selected object above the others while it is selected
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Click the red square at the back. Off, it is painted on top while selected; on (the v7 default), it stays where the stack puts it.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const red = new Rect({ left: 110, top: 90, width: 90, height: 90, fill: '#e94b3c', hasControls: false });
  const green = new Rect({ left: 150, top: 110, width: 90, height: 90, fill: '#2e9e5b', hasControls: false });
  const blue = new Rect({ left: 190, top: 90, width: 90, height: 90, fill: '#3b7dd8', hasControls: false });
  canvas.add(red, green, blue);

  const report = (): void => say(`preserveObjectStacking ${canvas.preserveObjectStacking}\nselected: ${canvas.getActiveObject() === red ? 'red' : 'nothing'}`);
  canvas.on('selection:created', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) checkbox(stage.bar, 'preserveObjectStacking', true, (v) => ((canvas.preserveObjectStacking = v), canvas.requestRenderAll(), report()));
  else {
    const ghost = stage.ghost(canvas);
    let keep = false;
    stage.repeat(async () => {
      canvas.preserveObjectStacking = keep;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      report();
      await ghost.click({ x: 80, y: 70 });
      await stage.wait(1200);
      keep = !keep;
    }, 300);
  }

  return stage.dispose;
};

export default mount;
