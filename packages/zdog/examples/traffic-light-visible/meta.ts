// Zdog example: Traffic light, lamps switched on with Shape visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Traffic light',
  summary:
    'A traffic light that cycles red, green, yellow. Every lamp is a dark disc with a bright copy sitting on it, and the copy is shown or hidden by setting its visible option. Hiding a shape this way costs nothing to undo, so it suits anything that switches on and off.',
  section: 'API: Shape',
  tags: ['Shape', 'visible', 'copy', 'Group', 'Ellipse', 'Box', 'Cylinder'],
  docs: ['repo/modules/docs/api-shape.hbs', 'repo/modules/docs/api-group.hbs', 'repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
