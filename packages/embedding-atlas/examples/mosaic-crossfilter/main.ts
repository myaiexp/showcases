// Two projections cross-filtering each other through one Mosaic Selection
import { EmbeddingViewMosaic } from 'embedding-atlas';
import { Selection } from '@uwdata/mosaic-core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng, topicPoints } from '../../shared/data.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Shift+drag in either view: the other shows only the rows inside.' });
  const mosaic = await stage.mosaic();
  const count = stage.preview ? 6000 : 40000;
  // A second projection of the same rows: topics side by side on u, y (plus noise) on v.
  const points = topicPoints({ count });
  const r = rng(21);
  const u = new Float32Array(count);
  const v = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    u[i] = points.category[i]! * 3 + gauss(r) * 0.6;
    v[i] = points.y[i]! + gauss(r) * 0.8;
  }
  // pointsTable draws the same seeded points, so row i matches u[i], v[i].
  const { table } = await pointsTable(mosaic, { count }, { u, v });
  if (stage.disposed) return stage.dispose;

  // crossfilter: each view is filtered by the other's brush, never by its own.
  const brush = Selection.crossfilter();
  const half = Math.floor(stage.width / 2) - 2;
  const views = (
    [
      ['x', 'y', 0],
      ['u', 'v', half + 4],
    ] as const
  ).map(([x, y, left]) => {
    const pane = document.createElement('div');
    pane.style.cssText = `position:absolute;top:0;left:${left}px;width:${half}px;height:100%`;
    stage.view.append(pane);
    return stage.own(
      new EmbeddingViewMosaic(pane, {
        coordinator: mosaic.coordinator,
        table,
        x,
        y,
        category: 'topic_id',
        filter: brush,
        rangeSelection: brush,
        width: half,
        height: stage.height,
        config: { colorScheme: 'dark' },
        theme: { statusBar: !stage.preview },
      }),
    );
  });

  // Cards brush the right-hand view, one topic column at a time.
  let k = 0;
  if (stage.preview) {
    stage.every(1800, () => {
      const t = k++ % 6;
      views[1]!.update({ rangeSelectionValue: { xMin: t * 3 - 1.2, yMin: -8, xMax: t * 3 + 1.2, yMax: 8 } });
    });
  }
  return stage.dispose;
};

export default mount;
