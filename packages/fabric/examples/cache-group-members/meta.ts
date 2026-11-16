// fabric example: Object caching: a group caches its members
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: a group caches its members',
  summary:
    'ownCaching read from a Group and its members: with objectCaching on, only the group owns a cache. A member with a shadow offset makes the group stop caching and hand the job back to the members. Toggle both and read the result.',
  section: 'Object caching',
  tags: ['Group', 'objectCaching', 'ownCaching', 'shouldCache', 'Shadow'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/Shadow.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
