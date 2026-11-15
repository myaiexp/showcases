// embedding-atlas example: count-plot data.field as a { sql } expression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Count plot over a SQL field",
  summary:
    "The count plot field may be { sql }. Here it groups documents by publication month with strftime and sorts alphabetically, and in the second variant by whether a document has more than 300 words.",
  section: "Charts",
  tags: ['count-plot', 'data.field', '{ sql }', 'order: alphabetical', 'limit'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
