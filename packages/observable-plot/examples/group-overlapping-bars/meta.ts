// observable-plot example: Group: overlapping bars with y2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: overlapping bars with y2',
  summary:
    'Outputting y2 instead of y opts out of the implicit stack, so the sexes overlap; a screen blend mode keeps both visible.',
  section: 'Transform: Group',
  tags: ['barY', 'groupX', 'y2', 'mixBlendMode'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
