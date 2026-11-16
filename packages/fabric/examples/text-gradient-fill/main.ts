// Text: a Gradient as the fill paints the glyphs with a colour ramp
import { Canvas, FabricText, Gradient } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, GOLD, RED } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: "Gradient coordinates are in the text's own pixels, so they follow the measured width and height." });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Gradient\nfill', { left: 180, top: 120, fontFamily: 'Inter', fontSize: 80, fontWeight: 900, textAlign: 'center', lineHeight: 1, fill: RED });
  canvas.add(text);

  const say = status(stage);
  let a: string = RED;
  let b: string = BLUE;
  let kind: 'linear' | 'radial' = 'linear';
  const paint = (angle = 0): void => {
    const { width: w, height: h } = text;
    const dx = Math.cos(angle) * w / 2;
    const dy = Math.sin(angle) * h / 2;
    text.set(
      'fill',
      new Gradient({
        type: kind,
        coords:
          kind === 'linear'
            ? { x1: w / 2 - dx, y1: h / 2 - dy, x2: w / 2 + dx, y2: h / 2 + dy }
            : { x1: w / 2, y1: h / 2, r1: 0, x2: w / 2, y2: h / 2, r2: w / 2 },
        colorStops: [
          { offset: 0, color: a },
          { offset: 0.55, color: GOLD },
          { offset: 1, color: b },
        ],
      }),
    );
    say(`Gradient { type: '${kind}', 3 stops }`);
    canvas.requestRenderAll();
  };
  paint();

  if (stage.bar) {
    select(stage.bar, 'type', ['linear', 'radial'] as const, (v) => ((kind = v), paint()));
    color(stage.bar, 'first stop', RED, (v) => ((a = v), paint()));
    color(stage.bar, 'last stop', BLUE, (v) => ((b = v), paint()));
  } else {
    stage.loop((_dt, t) => paint(t * 1.2));
  }
  return stage.dispose;
};

export default mount;
