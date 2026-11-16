// Gradients: a percentage gradient follows text that changes width
import { Canvas, FabricText, Gradient } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: "Text changes size with its content, so the guide recommends gradientUnits: 'percentage': x2: 1 always reaches the last letter.",
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  void loadFonts().then(() => {
    if (stage.disposed) return;
    const text = new FabricText('Gradient', { left: 180, top: 120, fontFamily: 'Inter', fontWeight: 800, fontSize: 70 });
    text.set(
      'fill',
      new Gradient({
        type: 'linear',
        gradientUnits: 'percentage',
        coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
        colorStops: [
          { offset: 0, color: '#e94b3c' },
          { offset: 0.5, color: '#fcd34d' },
          { offset: 1, color: '#3b7dd8' },
        ],
      }),
    );
    canvas.add(text);

    const words = ['Gradient', 'on text', 'it fits', 'W', 'Wide words stretch it'];
    const change = (w: string): void => {
      text.set({ text: w, fontSize: w.length > 12 ? 34 : 70 });
      say(`"${w}" is ${text.width.toFixed(0)} px wide`);
      canvas.requestRenderAll();
    };
    if (stage.preview) {
      let k = 0;
      stage.every(1200, () => change(words[++k % words.length]!));
    } else select(stage.bar!, 'text', words, change);
  });

  return stage.dispose;
};

export default mount;
