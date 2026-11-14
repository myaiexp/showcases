// Zdog example: Group visible, hiding a whole group or just one shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group visible',
  summary:
    'Two table lamps and a button that hides each lamp head. On the left the head is a Group holding the shade and the bulb, so setting its visible to false removes both. On the right the head is a single Shape with the bulb as its child, and its visible only hides the shade: the bulb is left floating.',
  section: 'API: Group',
  tags: ['Group', 'Shape', 'visible', 'addTo', 'Ellipse'],
  docs: ['repo/modules/docs/api-group.hbs', 'repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
