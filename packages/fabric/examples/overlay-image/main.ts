// overlayImage draws a picture above the objects
import { Canvas, Circle, FabricImage, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The frame is canvas.overlayImage; objects slide underneath it. Drag a shape toward the edge.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);
  const { width: w, height: h } = stage;

  // The overlay is an ordinary image, painted here: dark everywhere except a rounded window.
  const frame = document.createElement('canvas');
  frame.width = w;
  frame.height = h;
  const g = frame.getContext('2d')!;
  g.fillStyle = 'rgba(25,30,60,0.92)';
  g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = 'destination-out';
  g.beginPath();
  g.roundRect(w * 0.12, h * 0.14, w * 0.76, h * 0.72, 22);
  g.fill();
  const overlay = new FabricImage(frame, { originX: 'left', originY: 'top', selectable: false, evented: false });
  canvas.overlayImage = overlay;

  const rect = new Rect({ left: w * 0.38, top: h / 2, width: w * 0.2, height: h * 0.34, fill: '#e94b3c', angle: 10 });
  const circle = new Circle({ left: w * 0.66, top: h / 2, radius: Math.min(w, h) * 0.17, fill: '#f2b134' });
  canvas.add(rect, circle);

  say('overlayImage set');
  if (stage.bar) {
    checkbox(stage.bar, 'show overlayImage', true, (v) => {
      canvas.overlayImage = v ? overlay : undefined;
      say(v ? 'overlayImage set' : 'overlayImage removed');
      canvas.requestRenderAll();
    });
  } else {
    stage.loop((_dt, t) => {
      rect.set({ left: w * 0.5 + w * 0.5 * Math.sin(t * 0.9) });
      circle.set({ top: h / 2 + h * 0.5 * Math.cos(t * 1.1) });
      canvas.requestRenderAll();
    });
  }

  return stage.dispose;
};

export default mount;
