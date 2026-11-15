// embedding-atlas example: additionalTables with a many-to-many relation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A second table with a relation',
  summary:
    'additionalTables registers another DuckDB table next to the main one. Its relation says how rows join: mainKey UNNEST(tags) turns the main table\'s list column into one key per tag, matched to the second table\'s id. A chart over the second table then follows selections made on the main one, and the reverse.',
  section: 'EmbeddingAtlas',
  tags: ['additionalTables', 'relation', 'mainKey', 'key', 'UNNEST', 'from'],
  docs: ['repo/packages/viewer/src/api.ts', 'repo/packages/viewer/src/charts/spec/spec.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
