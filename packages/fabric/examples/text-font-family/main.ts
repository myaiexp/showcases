// Text: fontFamily switches the face; the bundled fonts load first
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK } from '../../shared/text.ts';

const FAMILIES = ['Times New Roman', 'Inter', 'Lora', 'Kalam', 'Caveat'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'The default family is Times New Roman; the other four are bundled with this gallery.' });
  // Fabric measures glyphs when the text is created, so the fonts must be ready before it.
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Quick brown fox\njumps over the dog', { left: 180, top: 120, fontSize: 34, fill: INK, textAlign: 'center' });
  canvas.add(text);

  const say = status(stage);
  const use = (family: string): void => {
    text.set('fontFamily', family);
    say(`fontFamily: '${family}'`);
    canvas.requestRenderAll();
  };
  use('Times New Roman');

  if (stage.bar) select(stage.bar, 'fontFamily', FAMILIES, use);
  else cycle(stage, FAMILIES, 1300, use);
  return stage.dispose;
};

export default mount;
