// embedding-atlas example: layer.from as a table name and as { sql }
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer data from a SQL table",
  summary:
    "A layer reads the main table by default. from can name a table, or give { sql } that builds one: a per-topic average computed in SQL and drawn as bars, and a query that reads the shared filter through $filter.",
  section: "Charts",
  tags: ['from', 'SQLTable', '{ sql }', '$filter', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
