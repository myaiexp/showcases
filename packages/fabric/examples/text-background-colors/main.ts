// backgroundColor fills the whole box, textBackgroundColor only the lines of text
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, cycle, GREEN, INK } from '../../shared/text.ts';

const ALIGNS = ['left', 'center', 'right'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'textBackgroundColor hugs each line and follows textAlign and lineHeight; backgroundColor is the object box, so ragged lines leave gaps.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const common = { top: 125, fontFamily: 'Kalam', fontSize: 17, fill: INK, lineHeight: 1.4, textAlign: 'left' } as const;
  const text = 'a short\na much longer line\nmid';
  const whole = new FabricText(text, { ...common, left: 92, backgroundColor: BLUE });
  const lines = new FabricText(text, { ...common, left: 268, textBackgroundColor: GREEN });
  canvas.add(whole, lines, new FabricText('backgroundColor', { left: 92, top: 25, fontFamily: 'Inter', fontSize: 12, fill: BLUE }), new FabricText('textBackgroundColor', { left: 268, top: 25, fontFamily: 'Inter', fontSize: 12, fill: GREEN }));

  const say = status(stage);
  const align = (v: (typeof ALIGNS)[number]): void => {
    whole.set('textAlign', v);
    lines.set('textAlign', v);
    say(`textAlign: '${v}'`);
    canvas.requestRenderAll();
  };
  align('left');

  if (stage.bar) select(stage.bar, 'textAlign', ALIGNS, align);
  else cycle(stage, ALIGNS, 1300, align);
  return stage.dispose;
};

export default mount;
