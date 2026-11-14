// Pizzicato.js example: one effect on a whole Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One effect for the whole group',
  summary:
    'A band of three recordings plays dry, then a single group.addEffect() puts a filter, fuzz or wobble over all of it at once, instead of one effect per sound.',
  section: 'Grouping sounds',
  tags: ['Group', 'addEffect', 'LowPassFilter', 'Distortion', 'Tremolo'],
  docs: ['repo/README.md', 'repo/src/Group.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
