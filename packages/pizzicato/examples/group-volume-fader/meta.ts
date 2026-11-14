// Pizzicato.js example: one volume fader for a whole Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One volume fader for a group',
  summary:
    'group.volume turns the whole band up or down at once. The tracks keep their own volumes, as the little bars show: the group fader scales them all together.',
  section: 'Grouping sounds',
  tags: ['Group', 'volume'],
  docs: ['repo/README.md', 'repo/src/Group.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
