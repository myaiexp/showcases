// Text: charSpacing adds space between characters, in thousandths of the font size
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Negative values pack the letters, positive ones spread them. 1000 is one full font size.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('SPACING', { left: 180, top: 120, fontFamily: 'Inter', fontSize: 44, fontWeight: 700, fill: INK });
  canvas.add(text);

  const say = status(stage);
  const set = (v: number): void => {
    text.set('charSpacing', v);
    say(`charSpacing: ${v.toFixed(0)}  ·  width ${text.width.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  set(0);

  if (stage.bar) slider(stage.bar, 'charSpacing', -150, 500, 5, 0, set);
  else stage.loop((_dt, t) => set(150 + 250 * Math.sin(t * 1.3)));
  return stage.dispose;
};

export default mount;
