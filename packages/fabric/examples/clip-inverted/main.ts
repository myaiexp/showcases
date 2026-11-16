// Clip paths: an inverted Group clip path cuts four holes in a picture instead of keeping the circles
import { Canvas, Circle, FabricImage, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Invert the Group, not the circles inside it: inverting members of a clip group has no effect.' });
  const canvas = stage.own(new Canvas(stage.el));

  const img = new FabricImage(picture('landscape', 300, 200), { left: 150, top: 100, selectable: false });
  const circles = [-1, 1].flatMap((sx) => [-1, 1].map((sy) => new Circle({ radius: 48, left: sx * 70, top: sy * 45 })));
  const clipPath = new Group(circles);
  clipPath.inverted = true;
  img.clipPath = clipPath;
  canvas.add(img);

  const redraw = (): void => { img.set('dirty', true); canvas.requestRenderAll(); };
  if (stage.bar) {
    checkbox(stage.bar, 'inverted', true, (v) => { clipPath.inverted = v; redraw(); });
    slider(stage.bar, 'radius', 20, 80, 1, 48, (v) => { circles.forEach((c) => c.set('radius', v)); clipPath.triggerLayout(); redraw(); });
  } else {
    stage.loop((_dt, t) => {
      circles.forEach((c) => c.set('radius', 40 + Math.sin(t * 1.5) * 12));
      clipPath.triggerLayout();
      clipPath.inverted = Math.floor(t / 2.5) % 2 === 0;
      redraw();
    });
  }
  return stage.dispose;
};

export default mount;
