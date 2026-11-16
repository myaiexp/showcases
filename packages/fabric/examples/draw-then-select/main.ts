// Free drawing: switch isDrawingMode off and the drawn Paths select, move and scale like any object
import { Canvas, PencilBrush, Point, type Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, button } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Draw a few strokes, then untick isDrawingMode: the strokes become selectable Paths with the usual controls.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PencilBrush(canvas);
  brush.color = '#2e9e5b';
  brush.width = 8;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const mode = (drawing: boolean): void => {
    canvas.isDrawingMode = drawing;
    say(drawing ? 'isDrawingMode true: drag to draw' : 'isDrawingMode false: click a path to select it');
  };
  mode(true);

  canvas.on('selection:created', () => {
    const o = canvas.getActiveObject();
    if (o) say(`selected ${o.type}: scale ${o.scaleX.toFixed(2)}, angle ${o.angle.toFixed(0)}°`);
  });
  canvas.on('object:modified', ({ target }) => say(`${target.type}: scale ${target.scaleX.toFixed(2)}, angle ${target.angle.toFixed(0)}°`));

  if (stage.bar) {
    checkbox(stage.bar, 'isDrawingMode', true, mode);
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      mode(true);
      await ghost.stroke(wave(40, 190, 90, 26, 1.2), 700);
      await ghost.stroke(loop(260, 150, 40, 1), 700);
      mode(false);
      const first = canvas.getObjects()[0] as Path | undefined;
      if (first) {
        await ghost.click(first.getCenterPoint());
        await ghost.drag(first.getCenterPoint(), new Point(120, 70), 600);
        await ghost.drag(controlPoint(first, 'br'), controlPoint(first, 'br').add(new Point(40, 30)), 600);
      }
      await stage.wait(900);
      canvas.discardActiveObject();
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
