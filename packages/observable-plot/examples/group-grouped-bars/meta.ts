// observable-plot example: Group: grouped bars with facets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: grouped bars with facets',
  summary:
    'fx facets by sport and x places a bar per sex inside each facet; the group transform partitions by facet on its own.',
  section: 'Transform: Group',
  tags: ['barY', 'groupX', 'fx', 'y2'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/features/facets.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
