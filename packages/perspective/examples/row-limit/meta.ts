// Perspective example: the limit option keeps a Table to a fixed number of rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Row limit',
  summary:
    'A Table created with limit: 12 never grows past twelve rows: once full, each update() overwrites the oldest rows. The seq column shows which rows survive.',
  section: 'Table',
  tags: ['limit', 'streaming', 'get_limit', 'size', 'update'],
  docs: ['repo/docs/md/explanation/table/options.md', 'repo/docs/md/explanation/table/update_and_remove.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
