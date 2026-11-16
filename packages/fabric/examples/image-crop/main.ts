// Images: cropX, cropY, width and height select a window of the source picture to show
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The faint picture is the whole source. cropX and cropY are where the window starts, width and height its size, all in source pixels.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const source = picture('city', 300, 200);
  const ox = 20;
  const oy = 20;
  const faint = new FabricImage(source, { left: ox, top: oy, originX: 'left', originY: 'top', opacity: 0.25, selectable: false, evented: false });
  const cropped = new FabricImage(source, { left: ox, top: oy, originX: 'left', originY: 'top', cropX: 60, cropY: 40, width: 160, height: 110, selectable: false, evented: false });
  canvas.add(faint, cropped);

  const apply = (p: { cropX?: number; cropY?: number; width?: number; height?: number }): void => {
    cropped.set(p);
    // keep the window on top of the same pixels of the faint picture
    cropped.set({ left: ox + cropped.cropX, top: oy + cropped.cropY });
    say(`cropX ${cropped.cropX.toFixed(0)} · cropY ${cropped.cropY.toFixed(0)}\nwidth ${cropped.width.toFixed(0)} · height ${cropped.height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply({});
  if (stage.bar) {
    slider(stage.bar, 'cropX', 0, 200, 1, 60, (cropX) => apply({ cropX, width: Math.min(cropped.width, 300 - cropX) }));
    slider(stage.bar, 'cropY', 0, 140, 1, 40, (cropY) => apply({ cropY, height: Math.min(cropped.height, 200 - cropY) }));
    slider(stage.bar, 'width', 20, 300, 1, 160, (width) => apply({ width: Math.min(width, 300 - cropped.cropX) }));
    slider(stage.bar, 'height', 20, 200, 1, 110, (height) => apply({ height: Math.min(height, 200 - cropped.cropY) }));
  } else {
    stage.loop((_dt, t) => apply({ cropX: 70 + 60 * Math.sin(t * 1.2), cropY: 45 + 35 * Math.cos(t * 0.9), width: 150, height: 100 }));
  }

  return stage.dispose;
};

export default mount;
