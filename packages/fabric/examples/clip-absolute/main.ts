// Clip paths: absolutePositioned clip paths stay fixed on the canvas while their images move
import { Canvas, FabricImage, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'Each picture can only show inside its own steady window. Drag the pictures; untick the box and the windows travel with them.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const top = new FabricImage(picture('landscape', 300, 120), { left: 150, top: 60 });
  const bottom = new FabricImage(picture('city', 300, 120), { left: 150, top: 180 });
  // The windows are measured on the canvas, from their own centres.
  const windowTop = new Rect({ width: 300, height: 120, left: 150, top: 60, absolutePositioned: true });
  const windowBottom = new Rect({ width: 300, height: 120, left: 150, top: 180, absolutePositioned: true });
  top.clipPath = windowTop;
  bottom.clipPath = windowBottom;
  canvas.add(top, bottom);

  const setAbsolute = (on: boolean): void => {
    for (const w of [windowTop, windowBottom]) w.absolutePositioned = on;
    for (const img of [top, bottom]) img.set('dirty', true);
    say(`absolutePositioned = ${on}`);
    canvas.requestRenderAll();
  };
  setAbsolute(true);

  if (stage.bar) checkbox(stage.bar, 'absolutePositioned', true, setAbsolute);
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.drag(top.getCenterPoint(), top.getCenterPoint().add(new Point(-50, 25)), 900);
      await ghost.drag(bottom.getCenterPoint(), bottom.getCenterPoint().add(new Point(55, -20)), 900);
      await stage.wait(600);
      top.set({ left: 150, top: 60 });
      bottom.set({ left: 150, top: 180 });
      for (const img of [top, bottom]) { img.setCoords(); img.set('dirty', true); }
      canvas.requestRenderAll();
    }, 500);
  }
  return stage.dispose;
};

export default mount;
