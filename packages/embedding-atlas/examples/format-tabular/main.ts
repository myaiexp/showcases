// EmbeddingAtlas over a table with no projection: a tabular dashboard
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docsTable } from '../../shared/table.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560, cardZoom: 0.4 });
  const mosaic = await stage.mosaic();
  const { table } = await docsTable(mosaic, { count: ctx.preview ? 1500 : 3000 });
  if (stage.disposed) return stage.dispose;

  stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      // No projection: there is no embedding chart, only the default charts and the table.
      data: { table, id: 'id', text: 'text' },
      colorScheme: 'dark',
      defaultChartsConfig: { exclude: ['id', 'x', 'y', 'text'], table: { columns: ['topic', 'source', 'words', 'rating'] } },
    }),
  );
  return stage.dispose;
};

export default mount;
