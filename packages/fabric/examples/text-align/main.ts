// Text: textAlign lines up multiline text inside its own box
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK } from '../../shared/text.ts';

const ALIGNS = ['left', 'center', 'right', 'justify', 'justify-left', 'justify-center', 'justify-right'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'A one-line text has nothing to align: its box is exactly as wide as the line. The justify values stretch the spaces to the widest line.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('this is\na multiline text\nwith lines of\nvery different\nlength', {
    left: 180,
    top: 120,
    fontFamily: 'Lora',
    fontSize: 28,
    fill: INK,
    backgroundColor: 'rgba(59,125,216,0.14)',
  });
  canvas.add(text);

  const say = status(stage);
  const align = (v: (typeof ALIGNS)[number]): void => {
    text.set('textAlign', v);
    say(`textAlign: '${v}'`);
    canvas.requestRenderAll();
  };
  align('left');

  if (stage.bar) select(stage.bar, 'textAlign', ALIGNS, align);
  else cycle(stage, ALIGNS, 1100, align);
  return stage.dispose;
};

export default mount;
