// fabric example: Clip paths: Clip paths inside a group stay isolated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Clip paths inside a group stay isolated',
  summary:
    "An object inside a clipped Group can carry its own clipPath: it is applied to that object alone, then the group's clip path applies to the whole. Two toggles switch each one.",
  section: 'Clip paths',
  tags: ['clipPath', 'Group', 'Circle', 'item'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part2.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part2.jsx', 'repo/src/content/docs/api/classes/Group.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
