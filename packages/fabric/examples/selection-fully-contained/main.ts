// Selection: selectionFullyContained limits the marquee to enclosed shapes
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag a marquee that covers the red square and only part of the circle. Off: both are selected. On: only the shape that fits entirely inside.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { all } = trio();
  canvas.add(...all);
  const say = status(stage);

  const report = (): void => say(`selectionFullyContained ${canvas.selectionFullyContained}\nselected [${canvas.getActiveObjects().map(who).join(', ')}]`);
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) checkbox(stage.bar, 'selectionFullyContained', false, (v) => ((canvas.selectionFullyContained = v), canvas.discardActiveObject(), canvas.requestRenderAll(), report()));
  else {
    const ghost = stage.ghost(canvas);
    let on = false;
    stage.repeat(async () => {
      canvas.selectionFullyContained = on;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      report();
      await ghost.drag(new Point(30, 60), new Point(190, 170), 1000);
      await stage.wait(1000);
      on = !on;
    }, 200);
  }

  return stage.dispose;
};

export default mount;
