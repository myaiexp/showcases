// embedding-atlas example: { sql } in a field and in an aggregate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SQL expressions as field and aggregate",
  summary:
    "Both a field and an aggregate accept { sql } instead of a name. The first variant bins the SQL expression words / 100 on x, the second computes a SQL aggregate (a share of long documents) on y.",
  section: "Charts",
  tags: ['{ sql }', 'SQLField', 'aggregate', 'bin'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
