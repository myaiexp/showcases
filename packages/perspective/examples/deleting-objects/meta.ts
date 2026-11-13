// Perspective example: deleting views, tables and viewers in the right order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deleting tables and views',
  summary:
    'Perspective objects live in WebAssembly memory and are never garbage collected. Try table.delete() while a view or a viewer still reads it (it throws), then delete in the right order, or use { lazy: true } to let the last view take the table with it.',
  section: 'Engine Library',
  tags: ['delete', 'lazy', 'memory', 'view', 'viewer', 'get_hosted_table_names'],
  docs: [
    'repo/docs/md/how_to/javascript/deleting.md',
    'repo/docs/md/how_to/javascript/loading_data.md',
    'repo/docs/md/explanation/view.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
