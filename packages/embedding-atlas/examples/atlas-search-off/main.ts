// searcher: null turns search off; leaving it out keeps the default text search
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, topicChart, wordsChart } from '../../shared/atlas-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460 });
  if (stage.disposed) return stage.dispose;

  stage.variants('searcher', ['undefined (default)', 'null (search off)'], (name, host) => {
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      // Left out, Atlas searches the text column; null removes the search box.
      ...(name.startsWith('null') ? { searcher: null } : {}),
      initialState: dashboard({ topics: topicChart, words: wordsChart }),
    });
  });
  return stage.dispose;
};

export default mount;
