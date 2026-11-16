// noScaleCache: the bitmap is stretched while scaling, redrawn on release
import { Canvas, Point, Polygon } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/custom.ts';

const star = (r: number): Point[] =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const d = i % 2 ? r * 0.45 : r;
    return new Point(Math.cos(a) * d, Math.sin(a) * d);
  });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 200],
    hint: 'Drag a corner of either star to enlarge it. With noScaleCache: true (the default) the cached bitmap is only stretched during the drag, so thin lines blur until you release; with false the cache is repainted at every step.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const make = (x: number, noScaleCache: boolean): Polygon =>
    new Polygon(star(26), {
      left: x, top: 100, fill: '#ffe9a8', stroke: '#2b2a33', strokeWidth: 1, strokeDashArray: [3, 2],
      noScaleCache, objectCaching: true,
    });
  const lazy = make(85, true);
  const exact = make(235, false);
  canvas.add(lazy, exact, caption('noScaleCache: true', 85, 178, 12), caption('noScaleCache: false', 235, 178, 12));
  canvas.setActiveObject(lazy);

  if (stage.bar) {
    slider(stage.bar, 'set scaleX/scaleY', 0.5, 3, 0.1, 1, (v) => {
      // Programmatic scaling is not a drag: fabric repaints the cache for both stars.
      for (const s of [lazy, exact]) {
        s.set({ scaleX: v, scaleY: v });
        s.setCoords();
      }
      canvas.requestRenderAll();
    });
  } else {
    const g = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const s of [lazy, exact]) {
        s.set({ scaleX: 1, scaleY: 1 });
        s.setCoords();
      }
      canvas.setActiveObject(lazy);
      canvas.requestRenderAll();
      await stage.wait(400);
      for (const s of [lazy, exact]) {
        canvas.setActiveObject(s);
        canvas.requestRenderAll();
        const br = controlPoint(s, 'br');
        await g.drag(br, new Point(br.x + 38, br.y + 30), 1400);
        await stage.wait(900);
      }
    }, 300);
  }
  return stage.dispose;
};

export default mount;
