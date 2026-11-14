// Zdog example: Figure kick, the tutorial character in motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Figure kick',
  summary:
    'The finished tutorial character, now moving. Each leg and arm turns around its own first path point, the hip or shoulder, and everything added to it follows, so a kick, a walk or a march is just a few rotate values per frame. Pick a move and change its speed.',
  section: 'Modeling',
  tags: ['rotate', 'Shape', 'RoundedRect', 'Anchor', 'addTo', 'path', 'translate'],
  docs: ['repo/modules/docs/modeling-tutorial.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
