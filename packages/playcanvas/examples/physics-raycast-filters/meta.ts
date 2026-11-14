// playcanvas example: Filtering ray casts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filtering ray casts',
  summary:
    'One ray runs through a row of eight bodies, and a select chooses how raycastAll filters the hits: nothing, filterTags for one tag or for two at once, a filterCallback that keeps only tall bodies, or filterCollisionMask against a body group (enemies sit in BODYGROUP_USER_1). The bodies that survive the filter light up; the cards step through the modes on their own.',
  section: 'Physics',
  tags: ['raycastAll', 'filterTags', 'filterCallback', 'filterCollisionMask', 'BODYGROUP_USER_1', 'Tags', 'group'],
  docs: ['repo/docs/user-manual/physics/ray-casting.md', 'repo/docs/user-manual/physics/rigid-bodies.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
