// Text: a Pattern as the fill tiles an image or canvas through the letters
import { Canvas, FabricText, Pattern } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { tile } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, GREEN, RED } from '../../shared/text.ts';

const KINDS = ['stripes', 'dots', 'checks'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'The source can be any image or canvas element; offsetX and offsetY slide the tiling under the glyphs.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const sources = {
    stripes: tile('stripes', 18, RED, '#f6c9c2'),
    dots: tile('dots', 20, BLUE, '#cfe0f6'),
    checks: tile('checks', 22, GREEN, '#cdebd9'),
  };
  const pattern = new Pattern({ source: sources.stripes, repeat: 'repeat' });
  const text = new FabricText('PATTERN', { left: 180, top: 120, fontFamily: 'Inter', fontSize: 64, fontWeight: 900, fill: pattern, stroke: '#2b2a33', strokeWidth: 2 });
  canvas.add(text);

  const say = status(stage);
  const show = (): void => {
    text.set('dirty', true);
    say(`offsetX ${pattern.offsetX.toFixed(0)} · offsetY ${pattern.offsetY.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  show();

  if (stage.bar) {
    select(stage.bar, 'source', KINDS, (v) => ((pattern.source = sources[v]), show()));
    slider(stage.bar, 'offsetX', 0, 60, 1, 0, (v) => ((pattern.offsetX = v), show()));
    slider(stage.bar, 'offsetY', 0, 60, 1, 0, (v) => ((pattern.offsetY = v), show()));
  } else {
    stage.loop((_dt, t) => {
      pattern.offsetX = (t * 24) % 36;
      pattern.offsetY = (t * 10) % 36;
      if (Math.floor(t / 3) % 3 !== KINDS.indexOf(pattern.source === sources.stripes ? 'stripes' : pattern.source === sources.dots ? 'dots' : 'checks')) pattern.source = sources[KINDS[Math.floor(t / 3) % 3]!];
      show();
    });
  }
  return stage.dispose;
};

export default mount;
