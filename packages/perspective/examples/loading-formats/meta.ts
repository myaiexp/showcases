// Perspective example: one dataset loaded in five input formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading formats',
  summary:
    'The same six rows handed to client.table() as row-oriented JSON, column-oriented JSON, a CSV string, NDJSON and an Arrow IPC buffer. Pick a format to see the table and the schema each one inferred.',
  section: 'Table',
  tags: ['table', 'CSV', 'NDJSON', 'Arrow', 'JSON', 'schema', 'to_arrow'],
  docs: [
    'repo/docs/md/explanation/table.md',
    'repo/docs/md/explanation/table/loading_data.md',
    'repo/docs/md/explanation/table/schema.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
