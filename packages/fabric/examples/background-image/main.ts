// backgroundImage draws a picture behind the objects; backgroundVpt follows zoom
import { Canvas, FabricImage, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The picture is canvas.backgroundImage. With backgroundVpt on (the default) it zooms with the objects; off, it stays put.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);
  const { width: w, height: h } = stage;

  // A FabricImage can wrap a <canvas> element directly: no loading, no promise.
  canvas.backgroundImage = new FabricImage(picture('landscape', w, h), { originX: 'left', originY: 'top' });
  canvas.add(new Rect({ left: w / 2, top: h / 2, width: 70, height: 70, rx: 10, ry: 10, fill: 'rgba(255,255,255,0.8)', stroke: '#3b2a8c', strokeWidth: 3 }));

  const zoom = (z: number): void => {
    canvas.zoomToPoint(new Point(w / 2, h / 2), z);
    say(`zoom ${z.toFixed(2)} · backgroundVpt ${canvas.backgroundVpt}`);
    canvas.requestRenderAll();
  };
  zoom(1);
  if (stage.bar) {
    slider(stage.bar, 'zoom', 0.5, 2, 0.05, 1, zoom, (v) => v.toFixed(2));
    checkbox(stage.bar, 'backgroundVpt', true, (v) => ((canvas.backgroundVpt = v), zoom(canvas.getZoom())));
  } else {
    stage.loop((_dt, t) => {
      canvas.backgroundVpt = Math.sin(t * 0.5) > 0;
      zoom(1.15 + 0.3 * Math.sin(t * 1.6));
    });
  }

  return stage.dispose;
};

export default mount;
