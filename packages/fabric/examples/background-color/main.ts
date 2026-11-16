// Canvas: backgroundColor fills the whole canvas behind every object
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, color } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const COLORS = ['#1f2a44', '#fbe9c6', '#0f6b5c', '#f2a39a', '#ffffff'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'backgroundColor is an option of the canvas, not an object: it is repainted behind everything, and any CSS colour works.' });
  const canvas = stage.own(new Canvas(stage.el, { backgroundColor: COLORS[0] }));
  const say = status(stage);
  const { width: w, height: h } = stage;

  canvas.add(
    new Rect({ left: w * 0.35, top: h / 2, width: w * 0.28, height: h * 0.45, fill: '#e94b3c', angle: 12 }),
    new Circle({ left: w * 0.65, top: h / 2, radius: Math.min(w, h) * 0.2, fill: '#f2b134' }),
  );

  const paint = (c: string): void => {
    canvas.backgroundColor = c;
    say(`backgroundColor ${c}`);
    canvas.requestRenderAll();
  };
  paint(COLORS[0]!);
  if (stage.bar) {
    const picker = color(stage.bar, 'backgroundColor', COLORS[0]!, paint);
    for (const c of COLORS.slice(1)) {
      button(stage.bar, c, () => {
        picker.value = c;
        paint(c);
      });
    }
  } else {
    let i = 0;
    stage.every(1100, () => paint(COLORS[++i % COLORS.length]!));
  }

  return stage.dispose;
};

export default mount;
