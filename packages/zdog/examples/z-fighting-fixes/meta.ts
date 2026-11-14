// Zdog example: Z-fighting fixes, the docs' ways to calm the popping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Z-fighting fixes',
  summary:
    'Two overlapping balls turning, with the docs\' remedies one click apart: give them the same colour, move them apart, put them in a Group so they draw in a fixed order, or add an invisible shape to a Group to balance its depth. Pick each to see the popping stop.',
  section: 'Extras',
  tags: ['Group', 'Shape', 'visible', 'color', 'translate', 'stroke'],
  docs: ['repo/content/extras.hbs', 'repo/modules/docs/api-group.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
