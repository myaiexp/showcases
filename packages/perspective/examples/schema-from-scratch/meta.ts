// Perspective example: a Table built from a schema, with coercion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Schema from scratch',
  summary:
    'client.table(schema) makes an empty Table with fixed column types, and update() then coerces what it is given: a number into a string column, epoch milliseconds or ISO text into dates, a missing column left null. Compare with the schema inference of plain data.',
  section: 'Table',
  tags: ['schema', 'coercion', 'date', 'datetime', 'null', 'update', 'type inference'],
  docs: [
    'repo/docs/md/explanation/table/constructing_schema.md',
    'repo/docs/md/explanation/table/schema.md',
    'repo/docs/md/explanation/table/loading_data.md',
    'repo/docs/md/explanation/table/update_and_remove.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
