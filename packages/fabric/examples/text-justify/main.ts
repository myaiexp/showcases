// Text: the four justify variants differ in where the last line goes
import { Canvas, FabricText, Textbox } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { BLUE, INK } from '../../shared/text.ts';

const VARIANTS = ['justify', 'justify-left', 'justify-center', 'justify-right'] as const;
const PARAGRAPH = 'Fabric stretches the spaces of every wrapped line until it reaches the box width. The last line stays short.';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'A Textbox wraps at its width; textAlign decides how the final, shorter line sits. Drag the width slider or the box handles.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const boxes = VARIANTS.map((variant, i) => {
    const x = 95 + (i % 2) * 170;
    const y = 62 + Math.floor(i / 2) * 118;
    canvas.add(new FabricText(variant, { left: x, top: y - 46, fontFamily: 'Inter', fontSize: 11, fontWeight: 600, fill: BLUE }));
    const box = new Textbox(PARAGRAPH, {
      left: x,
      top: y + 10,
      width: 150,
      fontFamily: 'Lora',
      fontSize: 13,
      lineHeight: 1.15,
      fill: INK,
      textAlign: variant,
      backgroundColor: 'rgba(59,125,216,0.1)',
    });
    canvas.add(box);
    return box;
  });

  const resize = (w: number): void => {
    for (const b of boxes) {
      b.set('width', w);
      b.setCoords();
    }
    canvas.requestRenderAll();
  };
  if (stage.bar) slider(stage.bar, 'width', 90, 160, 1, 150, resize);
  else stage.loop((_dt, t) => resize(125 + 30 * Math.sin(t * 1.1)));
  return stage.dispose;
};

export default mount;
