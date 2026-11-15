// The full Embedding Atlas UI on a Mosaic table: charts, table, search
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 640, cardZoom: 0.4 });
  const mosaic = await stage.mosaic();
  // id, x, y, topic, text, source, words, rating, score, published, tags
  const { table } = await docsTable(mosaic, { count: 5000 });
  if (stage.disposed) return stage.dispose;

  const atlas = new EmbeddingAtlas(stage.view, {
    coordinator: mosaic.coordinator,
    data: {
      table,
      id: 'id',
      projection: { x: 'x', y: 'y' },
      text: 'text',
    },
    colorScheme: 'dark',
  });
  stage.own(atlas);
  return stage.dispose;
};

export default mount;
