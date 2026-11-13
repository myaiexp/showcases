// Perspective example: a composite index keyed by two columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composite index',
  summary:
    'index: ["symbol", "client"] keys each row by the pair. update() must supply both key columns, remove() takes a list of [symbol, client] keys, and get_index() reports the list.',
  section: 'Table',
  tags: ['index', 'composite index', 'remove', 'get_index', 'update'],
  docs: ['repo/docs/md/explanation/table/options.md', 'repo/docs/md/explanation/table/update_and_remove.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
