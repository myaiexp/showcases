// rangeSelection: a rectangle set from code, onRangeSelection for drawn
import { EmbeddingView, type Point, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { pointIndex } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Shift+drag draws a rectangle (or use the toolbar\'s rectangle mode).' });
  const points = topicPoints({ count: stage.preview ? 10000 : 60000 });
  const index = pointIndex(points.x, points.y);
  const status = stage.preview ? null : readout(stage.box, 'no range selection');

  const report = (r: Rectangle | Point[] | null): void => {
    if (!status) return;
    if (r == null) status.textContent = 'onRangeSelection: null';
    else if (Array.isArray(r)) status.textContent = `onRangeSelection: a lasso of ${r.length} vertices`;
    else {
      const n = index.inRect(r.xMin, r.yMin, r.xMax, r.yMax).length;
      status.textContent = `onRangeSelection: x ${r.xMin.toFixed(2)}…${r.xMax.toFixed(2)}, y ${r.yMin.toFixed(2)}…${r.yMax.toFixed(2)} → ${n} points`;
    }
  };

  // A box around a topic centre, in data units (xMin ≤ xMax and yMin ≤ yMax are required).
  const around = (t: number, half = 1.4): Rectangle => {
    const [x, y] = points.centres[t]!;
    return { xMin: x - half, yMin: y - half, xMax: x + half, yMax: y + half };
  };

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    rangeSelection: around(0),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onRangeSelection: report,
  });
  stage.own(view);
  report(around(0));

  const show = (r: Rectangle | null): void => {
    view.update({ rangeSelection: r });
    report(r);
  };
  if (stage.bar) {
    points.names.forEach((name, t) => button(stage.bar!, name, () => show(around(t))));
    button(stage.bar, 'clear', () => show(null));
  }
  let t = 0;
  if (stage.preview) stage.every(1600, () => show(around((t = (t + 1) % points.names.length))));
  return stage.dispose;
};

export default mount;
