// A lasso range selection: a closed polygon of points instead of a rectangle
import { EmbeddingView, type Point, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { inPolygon } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Shift+cmd+drag (or the toolbar\'s lasso mode) draws your own lasso.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });
  const status = stage.preview ? null : readout(stage.box);

  // A star-shaped loop around a topic centre; `turn` spins it.
  const star = (t: number, turn: number): Point[] => {
    const [cx, cy] = points.centres[t]!;
    return Array.from({ length: 10 }, (_, k) => {
      const a = (k / 10) * Math.PI * 2 + turn;
      const r = k % 2 ? 0.8 : 2;
      return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });
  };
  const count = (poly: Point[]): number => {
    let n = 0;
    for (let i = 0; i < points.count; i++) if (inPolygon(points.x[i]!, points.y[i]!, poly)) n++;
    return n;
  };

  // The docs say a list of points is read as a lasso, but 0.26's type for the plain view's
  // rangeSelection is Rectangle only, hence the cast (onRangeSelection is typed for both).
  const asRange = (poly: Point[]): Rectangle => poly as unknown as Rectangle;

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    rangeSelection: asRange(star(0, 0)),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onRangeSelection: (r) => {
      if (status) status.textContent = Array.isArray(r) ? `lasso with ${r.length} vertices: ${count(r)} points inside` : `rectangle or null: ${JSON.stringify(r)}`;
    },
  });
  stage.own(view);
  if (status) status.textContent = `lasso with 10 vertices: ${count(star(0, 0))} points inside`;

  let k = 0;
  if (stage.preview) stage.every(1500, () => view.update({ rangeSelection: asRange(star(++k % points.centres.length, k * 0.3)) }));
  return stage.dispose;
};

export default mount;
