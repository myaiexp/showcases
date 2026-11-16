// Text: stroke and strokeWidth outline the letters; paintFirst chooses what is drawn first
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: "With paintFirst 'fill' (the default) the stroke covers half of each letter; 'stroke' draws it underneath." });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('OUTLINE', {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 72,
    fontWeight: 900,
    fill: '#ffffff',
    stroke: INK,
    strokeWidth: 6,
    strokeLineJoin: 'round',
  });
  
  canvas.add(text);

  const say = status(stage);
  const apply = (w: number, first: 'fill' | 'stroke'): void => {
    text.set({ strokeWidth: w, paintFirst: first });
    say(`strokeWidth: ${w.toFixed(1)}, paintFirst: '${first}'`);
    canvas.requestRenderAll();
  };
  apply(6, 'fill');

  if (stage.bar) {
    let w = 6;
    let first: 'fill' | 'stroke' = 'fill';
    slider(stage.bar, 'strokeWidth', 0, 20, 0.5, 6, (v) => apply((w = v), first));
    select(stage.bar, 'paintFirst', ['fill', 'stroke'] as const, (v) => apply(w, (first = v)));
  } else {
    stage.loop((_dt, t) => apply(2 + 9 * (0.5 + 0.5 * Math.sin(t * 1.5)), Math.floor(t / 2.5) % 2 ? 'stroke' : 'fill'));
  }
  return stage.dispose;
};

export default mount;
