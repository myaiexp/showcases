// observable-plot example: Pointer: maxRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: maxRadius',
  summary:
    'The maxRadius option sets how many pixels away a point can be and still be focused. Small values leave dead spots; large ones always find a point.',
  section: 'Interaction: Pointer',
  tags: ['dot', 'tip', 'pointer', 'maxRadius'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
