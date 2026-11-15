// rangeSelectionValue: set the brush from code as rectangle or lasso
import { EmbeddingViewMosaic, type Point, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, select } from '../../shared/controls.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const mosaic = await stage.mosaic();
  const { table, points } = await pointsTable(mosaic, { count: stage.preview ? 8000 : 50000 });
  if (stage.disposed) return stage.dispose;
  const [cx, cy] = points.centres[0]!;

  const shapes: Record<string, Rectangle | Point[] | null> = {
    rectangle: { xMin: cx - 2, yMin: cy - 1, xMax: cx + 2, yMax: cy + 1 },
    triangle: [
      { x: cx, y: cy + 2.5 },
      { x: cx - 2.5, y: cy - 1.5 },
      { x: cx + 2.5, y: cy - 1.5 },
    ],
    // A ring of 24 vertices: a lasso can be any closed shape.
    circle: Array.from({ length: 24 }, (_, k) => ({ x: cx + 2 * Math.cos((k / 24) * 6.283), y: cy + 2 * Math.sin((k / 24) * 6.283) })),
    'none (null)': null,
  };
  const names = Object.keys(shapes);
  const status = stage.preview ? null : readout(stage.box);

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    rangeSelectionValue: shapes.rectangle,
    width: stage.width,
    height: stage.height,
    viewportState: { x: cx, y: cy, scale: 0.25 },
    config: { colorScheme: 'dark' },
    onRangeSelection: (v) => {
      if (status) status.textContent = `onRangeSelection: ${v == null ? 'null' : Array.isArray(v) ? `polygon of ${v.length} points` : 'rectangle'}`;
    },
  });
  stage.own(view);

  const show = (name: string): void => view.update({ rangeSelectionValue: shapes[name] });
  if (stage.bar) select(stage.bar, 'rangeSelectionValue', names, show);
  let i = 0;
  if (stage.preview) stage.every(1500, () => show(names[(i = (i + 1) % names.length)]!));
  return stage.dispose;
};

export default mount;
