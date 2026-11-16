// Text: setSuperscript and setSubscript shrink a range and shift its baseline through styles
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Each call writes fontSize and deltaY into the styles of the range. The schemas live on the object: superscript { size: 0.6, baseline: -0.35 } and subscript { size: 0.6, baseline: 0.11 }.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('x2 + y2 = z2\nH2O and CO2\nE = mc2', { left: 180, top: 120, fontFamily: 'Lora', fontSize: 44, fill: INK, textAlign: 'center' });
  canvas.add(text);

  const say = status(stage);
  const apply = (on: boolean): void => {
    text.styles = {};
    if (on) {
      // Indexes count characters of the whole string, newlines included.
      for (const i of [1, 6, 11]) text.setSuperscript(i, i + 1);
      for (const i of [14, 23]) text.setSubscript(i, i + 1);
      text.setSuperscript(31, 32);
    }
    text.set('dirty', true);
    text.initDimensions();
    say(on ? `superscript ${text.superscript.size} · subscript ${text.subscript.baseline}` : 'no styles');
    canvas.requestRenderAll();
  };
  apply(true);

  if (stage.bar) {
    checkbox(stage.bar, 'scripts on', true, apply);
    const setup = (key: 'superscript' | 'subscript', prop: 'size' | 'baseline', v: number): void => {
      // A new object: the default one is shared by every text.
      text[key] = { ...text[key], [prop]: v };
      apply(true);
    };
    slider(stage.bar, 'superscript size', 0.3, 1, 0.05, 0.6, (v) => setup('superscript', 'size', v));
    slider(stage.bar, 'superscript baseline', -0.7, 0, 0.01, -0.35, (v) => setup('superscript', 'baseline', v), (v) => v.toFixed(2));
    slider(stage.bar, 'subscript baseline', 0, 0.4, 0.01, 0.11, (v) => setup('subscript', 'baseline', v), (v) => v.toFixed(2));
  } else {
    stage.every(1400, () => apply(!Object.keys(text.styles).length));
  }
  return stage.dispose;
};

export default mount;
