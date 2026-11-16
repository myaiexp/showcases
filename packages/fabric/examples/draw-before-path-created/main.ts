// before:path:created fires first, while the Path is not yet on the canvas
import { Canvas, PencilBrush, type Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { eventLog } from '../../shared/interaction.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The log shows the object count at each event. Tick the box to give the path an opacity in before:path:created: it is part of the path when it lands.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const log = eventLog(stage, 4);

  const brush = new PencilBrush(canvas);
  brush.color = '#c0392b';
  brush.width = 14;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  let faded = stage.preview;
  canvas.on('before:path:created', ({ path }) => {
    if (faded) (path as Path).set({ opacity: 0.45 });
    log.add('before:path:created', `canvas has ${canvas.getObjects().length}, path opacity ${path.opacity}`);
  });
  canvas.on('path:created', () => {
    log.add('path:created', `canvas has ${canvas.getObjects().length}`);
  });

  if (stage.bar) {
    checkbox(stage.bar, 'fade the path before it is added', false, (v) => (faded = v));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.stroke(wave(40, 320, 70, 22, 1.5), 800);
      await ghost.stroke(loop(180, 150, 34, 1), 700);
      await stage.wait(1200);
      canvas.remove(...canvas.getObjects());
      log.clear();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
