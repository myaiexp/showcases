// searcher.fullTextSearch: a custom search over tags, with onStatus
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, logPanel, topicChart } from '../../shared/atlas-kit.ts';
import { rows } from '../../shared/mosaic-kit.ts';

type Searcher = NonNullable<EmbeddingAtlasProps['searcher']>;

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460, hint: 'Open Search (magnifier) and type "com" or "fer": it matches tags that start with each word' });
  if (stage.disposed) return stage.dispose;
  const log = logPanel(stage, 6);

  const searcher: Searcher = {
    async fullTextSearch(query, options) {
      const limit = options?.limit ?? 100;
      options?.onStatus?.(`reading tags${options.predicate ? ' of the filtered rows' : ''}…`);
      // `predicate` is the SQL filter the other charts apply: honour it so search narrows, not widens.
      const where = options?.predicate ? `WHERE ${options.predicate}` : '';
      const found = await rows<{ id: number; tags: string[] }>(mosaic.coordinator, `SELECT id, tags FROM "${table}" ${where}`);
      const words = query.toLowerCase().split(/\s+/).filter(Boolean);
      options?.onStatus?.(`matching ${found.length} rows`);
      const hits = found.filter((r) => words.every((w) => Array.from(r.tags as ArrayLike<string>).some((t) => t.startsWith(w))));
      log(`"${query}" → ${hits.length} hits (limit ${limit}, predicate ${options?.predicate ?? 'none'})`);
      return hits.slice(0, limit).map((r) => ({ id: r.id }));
    },
  };

  stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      searcher,
      initialState: dashboard({ topics: topicChart, tags: { type: 'count-plot', title: 'tags', data: { field: 'tags', isList: true } } }),
    }),
  );
  if (stage.preview) {
    // Cards cannot type: run the same function on a timer and show what it returns.
    const queries = ['com', 'fer', 'ba', 'sc'];
    let i = 0;
    stage.every(2000, () => {
      const q = queries[i++ % queries.length]!;
      void searcher.fullTextSearch!(q).then((r) => log(`${q}: ${r.length}`));
    });
  }
  return stage.dispose;
};

export default mount;
