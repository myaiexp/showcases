// penrose example: One stage versus two stages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One stage versus two stages',
  summary:
    'Both tabs carry the same constraints. Without a `layout` line every unknown and constraint is solved together, so labels chase the points while they move. With `layout = [shape, label]` the points move alone and the labels follow once the shape is done.',
  section: 'Layout Stages',
  tags: ['layout', 'stage', 'default stage'],
  docs: ['repo/packages/docs-site/blog/staged-layout.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
