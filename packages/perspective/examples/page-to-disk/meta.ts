// Perspective example: page_to_disk keeps a Table's columns in browser storage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Page to disk',
  summary:
    'page_to_disk: true backs a Table with the browser Origin Private File System instead of memory. It behaves like any Table: this one is built from an Arrow of the in-memory twin, takes the same updates, and returns identical grouped totals.',
  section: 'Table',
  tags: ['page_to_disk', 'OPFS', 'Arrow', 'memory', 'update'],
  docs: ['repo/docs/md/explanation/table/options.md', 'repo/docs/md/explanation/table/loading_data.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
