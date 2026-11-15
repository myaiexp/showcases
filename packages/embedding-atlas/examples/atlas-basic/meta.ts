// embedding-atlas example: the full EmbeddingAtlas UI over a DuckDB table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The whole Atlas',
  summary:
    'new EmbeddingAtlas(target, { coordinator, data }) over a five-thousand-row table in DuckDB: the embedding view, a chart per column picked from its type (histograms for numbers and dates, count plots for text and lists), the SQL predicates box, the instances table and full-text search over the text column.',
  section: 'EmbeddingAtlas',
  tags: ['new EmbeddingAtlas', 'coordinator', 'data.table', 'data.id', 'data.projection', 'data.text', 'colorScheme'],
  docs: ['repo/packages/docs/embedding-atlas.md', 'repo/packages/viewer/src/api.ts', 'repo/packages/viewer/src/charts/default_charts.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
