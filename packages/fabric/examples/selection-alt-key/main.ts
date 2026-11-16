// Selection: altSelectionKey keeps the active object under a covering shape
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { BLUE, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Select the red rectangle, then click where the blue circle covers it. A plain click selects the circle; with the alt key held the red rectangle stays active.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const red = nameIt(new Rect({ left: 150, top: 120, width: 200, height: 120, fill: RED }), 'red');
  const blue = nameIt(new Circle({ left: 215, top: 120, radius: 55, fill: BLUE }), 'blue');
  canvas.add(red, blue);
  canvas.setActiveObject(red);
  const say = status(stage);

  // needs preserveObjectStacking (true by default): the covered object is still the one picked
  canvas.altSelectionKey = 'altKey';
  const report = (): void => say(`altSelectionKey ${canvas.altSelectionKey}\nactive: ${who(canvas.getActiveObject())}`);
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) {
    select(stage.bar, 'altSelectionKey', ['altKey', 'shiftKey', 'ctrlKey', 'none'], (v) => ((canvas.altSelectionKey = v === 'none' ? null : v), report()));
  } else {
    const ghost = stage.ghost(canvas);
    const overlap = { x: 200, y: 120 };
    stage.repeat(async () => {
      canvas.setActiveObject(red);
      canvas.requestRenderAll();
      await ghost.click(overlap, { altKey: true });
      await stage.wait(1300);
      await ghost.click(overlap);
      await stage.wait(1300);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
