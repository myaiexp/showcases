// embedding-atlas example: EmbeddingAtlas on a table with no projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tabular dashboard without a projection",
  summary:
    "Leave data.projection out and Embedding Atlas becomes a plain tabular dashboard: a chart for each column picked from its type, the SQL predicates box and the instances table, with no embedding view. defaultChartsConfig excludes the columns that were only there for a projection.",
  section: "Data Formats",
  tags: ['data.projection', 'defaultChartsConfig', 'exclude', 'tabular', 'EmbeddingAtlas'],
  docs: [
    'repo/packages/docs/embedding-atlas.md',
    'repo/packages/viewer/src/api.ts',
    'repo/packages/viewer/src/charts/default_charts.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
