// Perspective example: serializing a View in five formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serializing a view',
  summary:
    'One grouped View exported with to_json(), to_columns(), to_csv(), to_ndjson() and to_arrow(). The Arrow export is measured uncompressed, LZ4 and ZSTD, and each buffer is loaded back into a new table.',
  section: 'Engine Library',
  tags: ['to_json', 'to_columns', 'to_csv', 'to_ndjson', 'to_arrow', 'compression', 'lz4', 'zstd'],
  docs: ['repo/docs/md/how_to/javascript/serializing.md', 'repo/docs/md/explanation/view.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
