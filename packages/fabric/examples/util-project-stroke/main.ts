// util.projectStrokeOnPoints: where stroke corners land
import { Canvas, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { BLUE, GOLD, RED, at, dot, drift, handle, put } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Fabric needs the extent of a stroke to size a bounding box. projectStrokeOnPoints returns, for every vertex, the outermost point the stroke reaches (gold). Drag a vertex to a sharp angle and watch the miter spike, or pick bevel or round.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const pts = [handle(90, 150, BLUE), handle(200, 140, BLUE), handle(110, 90, BLUE)];
  canvas.add(...pts);
  const o = { width: 18, join: 'miter' as CanvasLineJoin, cap: 'butt' as CanvasLineCap, miter: 10, open: false };

  canvas.on('after:render', ({ ctx: c }) => {
    c.save();
    c.transform(...canvas.viewportTransform);
    const points = pts.map(at);
    c.beginPath();
    points.forEach((p, i) => (i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y)));
    if (!o.open) c.closePath();
    c.strokeStyle = 'rgba(59,125,216,0.35)';
    c.lineWidth = o.width;
    c.lineJoin = o.join;
    c.lineCap = o.cap;
    c.miterLimit = o.miter;
    c.stroke();
    const projected = util.projectStrokeOnPoints(
      points,
      { strokeWidth: o.width, strokeLineCap: o.cap, strokeLineJoin: o.join, strokeMiterLimit: o.miter, strokeUniform: false, scaleX: 1, scaleY: 1, skewX: 0, skewY: 0 },
      o.open,
    );
    for (const p of projected) dot(c, p.projectedPoint, GOLD, 4);
    for (const p of points) dot(c, p, RED, 2);
    const box = util.makeBoundingBoxFromPoints(projected.map((p) => p.projectedPoint));
    c.strokeStyle = GOLD;
    c.lineWidth = 1.5;
    c.setLineDash([5, 4]);
    c.lineJoin = 'miter';
    c.strokeRect(box.left, box.top, box.width, box.height);
    c.restore();
    say(`${projected.length} projected points\nbox ${Math.round(box.width)}×${Math.round(box.height)}`);
  });

  const redraw = (): void => {
    for (const p of pts) p.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);
  if (stage.bar) {
    slider(stage.bar, 'strokeWidth', 2, 40, 1, o.width, (v) => ((o.width = v), redraw()));
    select(stage.bar, 'strokeLineJoin', ['miter', 'round', 'bevel'] as const, (v) => ((o.join = v), redraw()));
    select(stage.bar, 'strokeLineCap', ['butt', 'round', 'square'] as const, (v) => ((o.cap = v), redraw()));
    slider(stage.bar, 'miterLimit', 1, 20, 1, o.miter, (v) => ((o.miter = v), redraw()));
    checkbox(stage.bar, 'open path', false, (v) => ((o.open = v), redraw()));
  } else {
    const joins = ['miter', 'bevel', 'round'] as const;
    let i = 0;
    stage.every(2000, () => (o.join = joins[++i % 3]!));
    stage.loop((_dt, t) => {
      put(pts[2]!, drift(t, 110, 90, 12, 35, 0.8));
      canvas.requestRenderAll();
    });
  }
  return stage.dispose;
};

export default mount;
