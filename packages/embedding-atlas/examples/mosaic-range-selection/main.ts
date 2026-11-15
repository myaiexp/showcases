// rangeSelection as a Mosaic Selection: a drawn brush becomes a SQL predicate
import { EmbeddingViewMosaic } from 'embedding-atlas';
import { Selection } from '@uwdata/mosaic-core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { countRows } from '../../shared/mosaic-kit.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Shift+drag a rectangle (shift+cmd+drag for a lasso).' });
  const mosaic = await stage.mosaic();
  const { table, points } = await pointsTable(mosaic, { count: stage.preview ? 8000 : 60000 });
  if (stage.disposed) return stage.dispose;

  // The view writes its brush into this Selection as a clause; anything can read the predicate.
  const brush = Selection.intersect();
  const status = stage.preview ? null : readout(stage.box, 'no brush yet');
  brush.addEventListener('value', async () => {
    const predicate = brush.predicate(null);
    const n = await countRows(mosaic.coordinator, table, brush);
    if (status) status.textContent = `${n} rows  ·  WHERE ${String(predicate) || '(none)'}`;
  });

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    rangeSelection: brush,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  // Cards draw the brush from code through rangeSelectionValue, which also fills the Selection.
  let k = 0;
  if (stage.preview) {
    stage.every(1500, () => {
      const [x, y] = points.centres[k++ % points.centres.length]!;
      view.update({ rangeSelectionValue: { xMin: x - 1.5, yMin: y - 1.5, xMax: x + 1.5, yMax: y + 1.5 } });
    });
  }
  return stage.dispose;
};

export default mount;
