// Text: a FabricText on a canvas, changed later with set()
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { slider } from '../../shared/controls.ts';
import { cycle, INK, textField } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Drag, scale or rotate the text like any object. Change its string and size below.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  // The text string is the first argument; everything else is the usual options object.
  const text = new FabricText('hello world', {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 48,
    fontWeight: 700,
    fill: INK,
  });
  canvas.add(text);

  const say = status(stage);
  const report = (): void => {
    say(`${JSON.stringify(text.text)} · ${text.width.toFixed(0)} × ${text.height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  report();

  if (stage.bar) {
    // set('text', …) re-measures the object; its width and height follow the content.
    textField(stage.bar, 'text', text.text, (v) => {
      text.set('text', v);
      canvas.centerObjectH(text);
      report();
    });
    slider(stage.bar, 'fontSize', 12, 90, 1, 48, (v) => {
      text.set('fontSize', v);
      report();
    });
  } else {
    cycle(stage, ['hello world', 'hello fabric', 'hello text'], 1500, (v) => {
      text.set('text', v);
      report();
    });
  }
  return stage.dispose;
};

export default mount;
