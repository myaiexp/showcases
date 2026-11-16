// Text: direction 'rtl' lays a line out right to left; pair it with textAlign
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK } from '../../shared/text.ts';

const MODES = ['ltr', 'rtl'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Marked experimental in the source: direction has to be set together with textAlign (and the origin) to look right. The Arabic and Hebrew lines use your system font.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Hello, (world)! 123\nمرحبا بالعالم\nשלום עולם', {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 30,
    fill: INK,
    backgroundColor: 'rgba(59,125,216,0.12)',
  });
  canvas.add(text);

  const say = status(stage);
  const use = (dir: (typeof MODES)[number]): void => {
    text.set({ direction: dir, textAlign: dir === 'rtl' ? 'right' : 'left' });
    say(`direction: '${dir}', textAlign: '${text.textAlign}'`);
    canvas.requestRenderAll();
  };
  use('ltr');

  if (stage.bar) select(stage.bar, 'direction', MODES, use);
  else cycle(stage, MODES, 1600, use);
  return stage.dispose;
};

export default mount;
