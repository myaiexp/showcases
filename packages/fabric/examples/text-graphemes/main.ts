// fabric splits text into graphemes with Intl.Segmenter, emoji included
import { Canvas, FabricText, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const FULL = 'café 👨‍👩‍👧 🇫🇮 ñ 👍🏽';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'One user-perceived character can be several code units: the family emoji is 8, the flag 4. Fabric measures, wraps and edits by grapheme.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const graphemes = util.string.graphemeSplit(FULL);
  const text = new FabricText(FULL, { left: 180, top: 110, fontFamily: 'Inter', fontSize: 40, fill: INK, backgroundColor: 'rgba(59,125,216,0.12)' });
  canvas.add(text);

  const say = status(stage);
  const show = (n: number): void => {
    const part = graphemes.slice(0, n).join('');
    text.set('text', part);
    say(`${n} graphemes · ${part.length} UTF-16 units`);
    canvas.requestRenderAll();
  };
  show(graphemes.length);

  if (stage.bar) slider(stage.bar, 'graphemes shown', 1, graphemes.length, 1, graphemes.length, show);
  else {
    let n = 0;
    stage.every(700, () => show((n++ % graphemes.length) + 1));
  }
  return stage.dispose;
};

export default mount;
