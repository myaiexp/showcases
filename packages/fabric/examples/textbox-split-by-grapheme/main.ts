// splitByGrapheme breaks a Textbox between any two characters, not only at spaces
import { Canvas, Textbox } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'By default only spaces break lines, so a long word makes the box wider than its width. With splitByGrapheme the word is cut where it must be: needed for scripts without spaces.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const box = new Textbox('Supercalifragilistic 日本語のテキスト', {
    left: 180,
    top: 120,
    width: 170,
    fontFamily: 'Inter',
    fontSize: 24,
    fill: INK,
    backgroundColor: 'rgba(59,125,216,0.1)',
    splitByGrapheme: false,
  });
  canvas.add(box);

  const say = status(stage);
  const apply = (split: boolean, width: number): void => {
    box.set({ splitByGrapheme: split, width });
    box.setCoords();
    say(`split: ${split} · width ${box.width.toFixed(0)} · ${box.textLines.length} lines`);
    canvas.requestRenderAll();
  };
  apply(false, 170);

  if (stage.bar) {
    let split = false;
    let w = 170;
    checkbox(stage.bar, 'splitByGrapheme', false, (v) => apply((split = v), w));
    slider(stage.bar, 'width', 60, 340, 1, 170, (v) => apply(split, (w = v)));
  } else {
    let on = false;
    stage.every(1600, () => apply((on = !on), 170));
  }
  return stage.dispose;
};

export default mount;
