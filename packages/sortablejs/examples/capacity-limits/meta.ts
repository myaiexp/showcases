// Sortable.js example: a put() function that refuses players once a squad is full
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Squads with a size limit',
  summary:
    'Build teams of three: a full squad refuses the next player and shows FULL until someone leaves. The rule is a small function, so it can be any rule you like.',
  section: 'Groups',
  tags: ['group', 'put: function', 'pull', 'onSort'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
