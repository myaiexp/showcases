// Objects that keep their screen size while zooming
import { Canvas, Circle, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, WORLD_H, WORLD_W } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Wheel to zoom. The map shapes grow with the zoom; the white-ringed pins set scaleX and scaleY to 1 / zoom, so they stay the same size on screen, and the dashed box has strokeUniform so its line does too.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  // A dashed box over part of the world whose line is 4 screen px at every zoom.
  const box = new Rect({ left: 380, top: 160, originX: 'left', originY: 'top', width: 240, height: 160, fill: 'rgba(59,125,216,0.08)', stroke: '#3b7dd8', strokeWidth: 4, strokeDashArray: [10, 6], strokeUniform: true, objectCaching: false, selectable: false, evented: false });
  const pins = [[160, 120], [500, 240], [820, 150], [700, 500], [240, 460]].map(
    ([x, y]) => new Circle({ left: x, top: y, radius: 9, fill: '#e94b3c', stroke: '#fff', strokeWidth: 3, strokeUniform: true, selectable: false, evented: false }),
  );
  canvas.add(box, ...pins);

  let keep = true;
  const rescale = (): void => {
    const z = canvas.getZoom();
    for (const p of pins) {
      // Undo the zoom: scene size x zoom is then always radius x 1 screen pixel.
      const s = keep ? 1 / z : 1;
      p.set({ scaleX: s, scaleY: s });
      p.setCoords();
    }
    if (stage.preview) say(`zoom ${z.toFixed(2)} · pin scale ${(keep ? 1 / z : 1).toFixed(2)}`);
    else say(`zoom ${z.toFixed(2)} · pin scale ${(keep ? 1 / z : 1).toFixed(2)} · pin on screen ${(18 * (keep ? 1 : z)).toFixed(0)} px wide`);
    canvas.requestRenderAll();
  };

  const w = stage.width;
  const h = stage.height;
  const home = Math.min(w / WORLD_W, h / WORLD_H);
  canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
  rescale();

  canvas.on('mouse:wheel', (opt) => {
    canvas.zoomToPoint(opt.viewportPoint, Math.min(20, Math.max(0.1, canvas.getZoom() * 0.999 ** opt.e.deltaY)));
    opt.e.preventDefault();
    opt.e.stopPropagation();
    rescale();
  });

  if (stage.bar) {
    checkbox(stage.bar, 'pins use 1 / zoom', true, (v) => ((keep = v), rescale()));
    button(stage.bar, 'Reset', () => {
      canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
      rescale();
    });
  } else {
    stage.loop((_dt, t) => {
      keep = Math.floor(t / 4) % 2 === 0;
      const z = home * (1 + 2.5 * (0.5 - 0.5 * Math.cos(t * 1.1)));
      canvas.zoomToPoint(new Point(w * 0.5, h * 0.45), z);
      rescale();
    });
  }

  return stage.dispose;
};

export default mount;
