// g6 example: BubbleSets: avoid members
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BubbleSets: avoid members',
  summary: 'avoidMembers lists nodes the contour must route around; addAvoidMember and removeAvoidMember on the instance change them live.',
  section: 'Plugin',
  tags: ['bubble-sets', 'avoidMembers', 'addAvoidMember', 'removeAvoidMember', 'getAvoidMember'],
  docs: ['repo/packages/site/docs/manual/plugin/BubbleSets.en.md', 'repo/packages/site/common/api/plugins/bubble-sets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
