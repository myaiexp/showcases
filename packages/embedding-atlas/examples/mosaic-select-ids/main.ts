// identifier column: select rows by id and get ids back from clicks
import { EmbeddingViewMosaic, type DataPointID } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { rows } from '../../shared/mosaic-kit.ts';
import { pointsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click points (shift/cmd+click to add): their ids appear below.' });
  const mosaic = await stage.mosaic();
  const { table } = await pointsTable(mosaic, { count: stage.preview ? 8000 : 50000 });
  if (stage.disposed) return stage.dispose;
  const status = stage.preview ? null : readout(stage.box, 'selection: none');

  // Ten ids at a time: the top-scoring rows of one topic, straight from SQL.
  const topIds = async (topic: number): Promise<DataPointID[]> => {
    const top = await rows<{ id: number }>(
      mosaic.coordinator,
      `SELECT id FROM "${table}" WHERE topic_id = ${topic} ORDER BY score DESC LIMIT 10`,
    );
    return top.map((r) => r.id);
  };

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    identifier: 'id',
    text: 'text',
    selection: await topIds(0),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onSelection: (s) => {
      if (status) status.textContent = `onSelection: ${s?.length ?? 0} — ids ${(s ?? []).map((p) => p.identifier).join(', ')}`;
    },
  });
  stage.own(view);

  if (stage.bar) {
    for (let t = 0; t < 6; t++) button(stage.bar, `top 10 of topic ${t}`, async () => view.update({ selection: await topIds(t) }));
    button(stage.bar, 'clear', () => view.update({ selection: null }));
  }
  let t = 0;
  if (stage.preview) stage.every(1600, async () => view.update({ selection: await topIds((t = (t + 1) % 6)) }));
  return stage.dispose;
};

export default mount;
