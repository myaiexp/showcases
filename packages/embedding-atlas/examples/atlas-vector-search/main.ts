// searcher.vectorSearch: nearest rows to a query vector, distances in JS
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, logPanel, topicChart } from '../../shared/atlas-kit.ts';
import { rows } from '../../shared/mosaic-kit.ts';

type Searcher = NonNullable<EmbeddingAtlasProps['searcher']>;
type Hit = { id: number; distance?: number };

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 460, hint: 'Open Search (magnifier), choose Vector, try "comet", "risotto" or "regatta"' });
  if (stage.disposed) return stage.dispose;
  const log = logPanel(stage, 6);

  // A stand-in for an embedding model: a query word maps to the mean (x, y) of the rows
  // whose text holds it. The rows' "embedding" is their projection, so the distance is 2D.
  const embed = async (query: string): Promise<[number, number] | null> => {
    const word = query.toLowerCase().split(/\s+/)[0] ?? '';
    const [mean] = await rows<{ x: number | null; y: number | null }>(
      mosaic.coordinator,
      `SELECT avg(x) AS x, avg(y) AS y FROM "${table}" WHERE text ILIKE '%${word.replace(/[^a-z]/g, '')}%'`,
    );
    return mean && mean.x != null && mean.y != null ? [mean.x, mean.y] : null;
  };

  const searcher: Searcher = {
    async vectorSearch(query, options) {
      options?.onStatus?.('embedding the query…');
      const q = await embed(query);
      if (!q) return [];
      options?.onStatus?.('ranking rows by distance…');
      const where = options?.predicate ? `WHERE ${options.predicate}` : '';
      const all = await rows<{ id: number; x: number; y: number }>(mosaic.coordinator, `SELECT id, x, y FROM "${table}" ${where}`);
      const hits: Hit[] = all.map((r) => ({ id: r.id, distance: Math.hypot(r.x - q[0], r.y - q[1]) }));
      hits.sort((a, b) => a.distance! - b.distance!);
      log(`"${query}" → vector (${q[0].toFixed(1)}, ${q[1].toFixed(1)}), nearest ${hits[0]?.distance?.toFixed(2)}`);
      return hits.slice(0, options?.limit ?? 100);
    },
  };

  const atlas = stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      searcher,
      initialState: dashboard({ topics: topicChart, source: { ...topicChart, title: 'source', data: { field: 'source' } } }),
    }),
  );
  if (stage.preview) {
    const queries = ['comet', 'risotto', 'regatta', 'cello'];
    let i = 0;
    stage.every(2200, () => {
      void searcher.vectorSearch!(queries[i++ % queries.length]!, { limit: 40 }).then((hits) => {
        if (!stage.disposed) atlas.update({ highlight: hits.map((h) => h.id) });
      });
    });
  }
  return stage.dispose;
};

export default mount;
