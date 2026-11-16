// Controls: createPolyControls gives a Polygon one draggable handle per point
import { Canvas, Point, Polygon, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'Each point of the polygon is a control (p0, p1, ...). Drag one to reshape it.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const poly = new Polygon([{ x: -70, y: -50 }, { x: 10, y: -80 }, { x: 80, y: -20 }, { x: 55, y: 60 }, { x: -20, y: 70 }, { x: -85, y: 20 }], {
    left: 160, top: 120, fill: '#d99a1c', stroke: '#7a5410', strokeWidth: 2, objectCaching: false, // points change: no stale cache
    cornerStyle: 'circle', cornerColor: '#e94b3c', cornerSize: 14, transparentCorners: false, hasBorders: false,
  });
  const edit = (on: boolean): void => {
    // one Control per point: createPolyControls(poly) names them p0, p1, ...
    poly.controls = on ? controlsUtils.createPolyControls(poly, { cursorStyle: 'pointer' }) : Polygon.createControls().controls;
    poly.hasBorders = !on;
    poly.setCoords();
    say(on ? `${poly.points.length} point controls: ${Object.keys(poly.controls).join(' ')}` : 'default controls');
    canvas.requestRenderAll();
  };
  canvas.add(poly);
  canvas.setActiveObject(poly);
  edit(true);

  if (stage.bar) checkbox(stage.bar, 'edit points', true, edit);
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const [key, dx, dy] of [['p1', 25, -25], ['p3', 30, 30], ['p5', -30, 10]] as const) {
        const p = controlPoint(poly, key);
        await ghost.drag(p, new Point(p.x + dx, p.y + dy), 700);
      }
      await stage.wait(500);
      for (const [key, dx, dy] of [['p5', 30, -10], ['p3', -30, -30], ['p1', -25, 25]] as const) {
        const p = controlPoint(poly, key);
        await ghost.drag(p, new Point(p.x + dx, p.y + dy), 500);
      }
    }, 300);
  }
  return stage.dispose;
};

export default mount;
