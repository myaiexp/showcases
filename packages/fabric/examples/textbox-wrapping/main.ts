// Text: a Textbox wraps its text at its width, and the side handles resize that width
import { Canvas, Point, Textbox } from 'fabric';
import type { Mount } from '@/types.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Select the box and drag a side handle (ml, mr): a Textbox turns the drag into a new width and rewraps, where a plain text would scale.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const box = new Textbox('A Textbox keeps its width and wraps the words that do not fit onto the next line.', {
    left: 180,
    top: 120,
    width: 220,
    fontFamily: 'Lora',
    fontSize: 18,
    fill: INK,
    backgroundColor: 'rgba(59,125,216,0.1)',
  });
  canvas.add(box);

  const say = status(stage);
  const report = (): void => {
    say(`width ${box.width.toFixed(0)} · ${box.textLines.length} lines · scaleX ${box.scaleX.toFixed(2)}`);
    canvas.requestRenderAll();
  };
  report();
  canvas.on('object:scaling', report);
  canvas.on('object:modified', report);

  if (stage.bar) {
    slider(stage.bar, 'width', 60, 340, 1, 220, (v) => {
      box.set('width', v);
      box.setCoords();
      report();
    });
  } else {
    const ghost = stage.ghost(canvas);
    canvas.setActiveObject(box);
    box.setCoords();
    stage.repeat(async () => {
      const grip = (): Point => controlPoint(box, 'mr');
      await ghost.drag(grip(), grip().add(new Point(-70, 0)), 800);
      await stage.wait(500);
      await ghost.drag(grip(), grip().add(new Point(110, 0)), 900);
      await stage.wait(500);
      await ghost.drag(grip(), grip().add(new Point(-40, 0)), 700);
      await stage.wait(300);
    }, 300);
  }
  return stage.dispose;
};

export default mount;
