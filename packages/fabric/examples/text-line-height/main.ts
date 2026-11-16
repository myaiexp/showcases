// Text: lineHeight sets the vertical space between lines
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'The default is 1.16. The tinted lines are textBackgroundColor: they show the space each line owns.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Lorem ipsum\ndolor sit amet,\nconsectetur', {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 30,
    fontWeight: 500,
    fill: INK,
    textBackgroundColor: 'rgba(233,75,60,0.2)',
    textAlign: 'center',
  });
  canvas.add(text);

  const say = status(stage);
  const set = (v: number): void => {
    text.set('lineHeight', v);
    say(`lineHeight: ${v.toFixed(2)}  ·  height ${text.height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  set(1.16);

  if (stage.bar) slider(stage.bar, 'lineHeight', 0.6, 2.2, 0.02, 1.16, set, (v) => v.toFixed(2));
  else stage.loop((_dt, t) => set(1.4 + 0.8 * Math.sin(t * 1.4)));
  return stage.dispose;
};

export default mount;
