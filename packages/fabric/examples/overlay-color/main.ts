// overlayColor paints a colour over everything on the canvas
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, color } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tint is drawn after the objects. Select a shape: its controls sit under the overlay unless controlsAboveOverlay is on.' });
  const canvas = stage.own(new Canvas(stage.el, { overlayColor: 'rgba(30,60,160,0.35)' }));
  const say = status(stage);
  const { width: w, height: h } = stage;

  const rect = new Rect({ left: w * 0.35, top: h / 2, width: w * 0.28, height: h * 0.45, fill: '#e94b3c' });
  canvas.add(rect, new Circle({ left: w * 0.65, top: h / 2, radius: Math.min(w, h) * 0.2, fill: '#f2b134' }));
  canvas.setActiveObject(rect);

  const tints = ['rgba(30,60,160,0.35)', 'rgba(20,160,90,0.35)', 'rgba(0,0,0,0.5)', 'rgba(255,255,255,0.0)'];
  const tint = (c: string): void => {
    canvas.overlayColor = c;
    say(`overlayColor ${c}`);
    canvas.requestRenderAll();
  };
  tint(tints[0]!);
  if (stage.bar) {
    color(stage.bar, 'overlayColor', '#1e3ca0', (c) => tint(`${c}59`));
    checkbox(stage.bar, 'controlsAboveOverlay', false, (v) => ((canvas.controlsAboveOverlay = v), canvas.requestRenderAll()));
  } else {
    let i = 0;
    stage.every(1200, () => tint(tints[++i % tints.length]!));
  }

  return stage.dispose;
};

export default mount;
