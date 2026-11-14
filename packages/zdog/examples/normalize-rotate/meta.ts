// Zdog example: Normalize rotate, wrapping a spinning dial's angle to one turn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normalize rotate',
  summary:
    'A safe-door dial turns round and round while a bar underneath fills once per turn. Spinning by adding to rotate makes the number grow without end; normalizeRotate wraps it back between 0 and one full turn (TAU) without changing how the dial looks. Switch it off and watch the number run away.',
  section: 'API: Anchor',
  tags: ['Anchor', 'normalizeRotate', 'rotate', 'TAU', 'Group', 'Ellipse'],
  docs: ['repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/api-utils.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
