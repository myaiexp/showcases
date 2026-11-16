// Text: textDecorationColor and textDecorationThickness restyle the decoration lines (new in v7)
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, GOLD, INK, RED } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The thickness is in thousandths of fontSize (default 66.667, the old 1/15 em). Without a colour the lines take the text fill.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Underlined\nstruck, overlined', {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 38,
    fontWeight: 600,
    fill: INK,
    underline: true,
    overline: true,
    linethrough: true,
    textAlign: 'center',
    textDecorationColor: RED,
    textDecorationThickness: 66.667,
  });
  canvas.add(text);

  const say = status(stage);
  const apply = (c: string, t: number): void => {
    text.set({ textDecorationColor: c, textDecorationThickness: t });
    say(`color ${c} · thickness ${t.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply(RED, 66.667);

  if (stage.bar) {
    let c: string = RED;
    let t = 66.667;
    color(stage.bar, 'textDecorationColor', RED, (v) => apply((c = v), t));
    slider(stage.bar, 'textDecorationThickness', 10, 200, 1, 66.667, (v) => apply(c, (t = v)));
  } else {
    const colors = [RED, BLUE, GOLD];
    stage.loop((_dt, s) => apply(colors[Math.floor(s / 1.5) % 3]!, 70 + 55 * Math.sin(s * 2.4)));
  }
  return stage.dispose;
};

export default mount;
