// onExportSelection: Atlas passes the predicate and format; no download
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, infoPanel, topicChart, wordsChart } from '../../shared/atlas-kit.ts';
import { countRowsWhere, rowsWhere } from '../../shared/atlas-sql.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460, hint: 'Select something, then click the download icon beside the point count' });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage, 'onExportSelection has not been called yet');

  // What a real exporter would run: a query over the predicate, written out in `format`.
  const onExportSelection = async (predicate: string | null, format: 'json' | 'jsonl' | 'csv' | 'parquet'): Promise<void> => {
    const n = await countRowsWhere(mosaic.coordinator, table, predicate);
    const sample = await rowsWhere<{ id: number; topic: string }>(mosaic.coordinator, table, predicate, 'id, topic', 3);
    if (stage.disposed) return;
    info.textContent =
      `onExportSelection(${predicate == null ? 'null' : JSON.stringify(predicate)}, "${format}")\n` +
      `COPY (SELECT * FROM ${table}${predicate ? ` WHERE ${predicate}` : ''}) TO 'export.${format}'\n` +
      `${n} rows, first ids ${sample.map((r) => r.id).join(', ')}`;
  };

  stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      initialState: { ...dashboard({ topics: topicChart, words: wordsChart }), chartStates: { topics: { selection: ['music'] } } },
      onExportSelection,
    }),
  );
  if (stage.preview) {
    // Cards cannot open the menu, so they call the same handler with a sample predicate.
    const calls: [string | null, 'json' | 'jsonl' | 'csv' | 'parquet'][] = [
      ["topic = 'music'", 'csv'],
      ['words BETWEEN 100 AND 300', 'parquet'],
      [null, 'jsonl'],
    ];
    let i = 0;
    stage.every(2400, () => void onExportSelection(...calls[i++ % calls.length]!));
  }
  return stage.dispose;
};

export default mount;
