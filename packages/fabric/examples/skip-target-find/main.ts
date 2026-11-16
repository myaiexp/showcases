// Canvas: skipTargetFind true makes the pointer ignore every object, so nothing can be picked or dragged
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'The shapes are still there and still drawn, and code can move them, but a click or drag no longer finds them. (The marquee is off here: it collects objects by area, not by target.)' });
  const canvas = stage.own(new Canvas(stage.el, { selection: false })); // the drag-to-select marquee does not use target finding, so it is off here
  const say = status(stage);

  const rect = new Rect({ left: 100, top: 100, width: 80, height: 80, fill: '#3b7dd8' });
  canvas.add(rect, new Circle({ left: 200, top: 100, radius: 40, fill: '#e94b3c' }));

  const report = (): void => say(`skipTargetFind ${canvas.skipTargetFind}\nfindTarget → ${canvas.getActiveObject() ? 'picked' : 'nothing picked'}`);
  canvas.on('selection:created', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) checkbox(stage.bar, 'skipTargetFind', false, (v) => ((canvas.skipTargetFind = v), canvas.discardActiveObject(), report()));
  else {
    const ghost = stage.ghost(canvas);
    let skip = false;
    stage.repeat(async () => {
      canvas.skipTargetFind = skip;
      rect.set({ left: 100, top: 100 });
      rect.setCoords();
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      report();
      await ghost.drag({ x: 100, y: 100 }, { x: 130, y: 150 }, 800);
      await stage.wait(900);
      skip = !skip;
    }, 300);
  }

  return stage.dispose;
};

export default mount;
