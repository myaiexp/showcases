// The styles object gives single characters their own colour, size and font
import { Canvas, FabricText, type TextStyle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const LINES = ['Per character', 'styles at work'];

/** Builds `styles`: line index → character index → style declaration. */
function rainbow(shift: number, big: boolean): TextStyle {
  const styles: TextStyle = {};
  LINES.forEach((line, row) => {
    styles[row] = {};
    [...line].forEach((ch, col) => {
      if (ch === ' ') return;
      styles[row]![col] = {
        fill: `hsl(${(col * 24 + row * 90 + shift) % 360} 75% 45%)`,
        ...(big ? { fontSize: 34 + 14 * Math.sin(col * 0.9 + row) , fontWeight: col % 3 === 0 ? 800 : 400 } : {}),
        ...(row === 1 && col > 8 ? { underline: true } : {}),
      };
    });
  });
  return styles;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'styles[line][char] is read per grapheme: anything left out falls back to the object-level value.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText(LINES.join('\n'), {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 34,
    fill: INK,
    textAlign: 'center',
    styles: rainbow(0, true),
  });
  canvas.add(text);

  const say = status(stage);
  const paint = (shift: number, big: boolean): void => {
    text.set('styles', rainbow(shift, big));
    say(`styles: ${Object.keys(text.styles).length} lines, ${Object.values(text.styles).reduce((n, l) => n + Object.keys(l).length, 0)} styled characters`);
    canvas.requestRenderAll();
  };
  paint(0, true);

  if (stage.bar) {
    let big = true;
    checkbox(stage.bar, 'sizes and weights too', true, (v) => paint(0, (big = v)));
    void big;
  } else {
    stage.loop((_dt, t) => paint(t * 60, true));
  }
  return stage.dispose;
};

export default mount;
