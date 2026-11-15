// filter: a Mosaic Selection that limits which rows the view draws
import { EmbeddingViewMosaic } from 'embedding-atlas';
import { Selection, clauseInterval } from '@uwdata/mosaic-core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';
import { countRows } from '../../shared/mosaic-kit.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const mosaic = await stage.mosaic();
  // Rows have a 0–100 score that rises with y (shared/table.ts).
  const { table } = await pointsTable(mosaic, { count: stage.preview ? 8000 : 60000 });
  if (stage.disposed) return stage.dispose;

  const filter = Selection.intersect();
  const source = {}; // identifies who set the clause
  const status = stage.preview ? null : readout(stage.box);
  const setRange = async (lo: number, hi: number): Promise<void> => {
    filter.update(clauseInterval('score', [lo, hi], { source }));
    if (status) status.textContent = `score between ${lo} and ${hi}: ${await countRows(mosaic.coordinator, table, filter)} rows`;
  };

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    filter,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);
  await setRange(40, 100);

  if (stage.bar) {
    let lo = 40, hi = 100;
    slider(stage.bar, 'min score', 0, 100, 1, lo, (v) => void setRange((lo = v), hi));
    slider(stage.bar, 'max score', 0, 100, 1, hi, (v) => void setRange(lo, (hi = v)));
  }
  // Cards step the lower bound up and down; each step is one round of queries, so not every frame.
  let k = 0;
  if (stage.preview) stage.every(900, () => void setRange(20 + 15 * (k++ % 5), 100));
  return stage.dispose;
};

export default mount;
