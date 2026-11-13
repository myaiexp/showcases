// Perspective example: inner, left and outer joins, right_on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Join types',
  summary:
    'client.join(left, right, on, { join_type, right_on }) builds a read-only Table from two tables. Switch between inner, left and outer to see which unmatched rows survive and where the nulls appear; the right key is named sku, so right_on maps it.',
  section: 'Join',
  tags: ['join', 'join_type', 'inner', 'left', 'outer', 'right_on', 'name'],
  docs: [
    'repo/docs/md/explanation/join.md',
    'repo/docs/md/explanation/join/join_types.md',
    'repo/docs/md/explanation/join/options.md',
    'repo/docs/md/how_to/javascript/join.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
