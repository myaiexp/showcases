// Zdog example: a conveyor belt whose crates wrap around with modulo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Conveyor belt with modulo',
  summary:
    'Crates ride a belt, drop off one end and reappear at the other, in either direction. Zdog.modulo wraps a growing number back into 0–1, even when it goes negative, which plain % does not; Zdog.lerp turns that 0–1 into a spot on the belt. Switch to % in the full view and run it backwards to see the difference.',
  section: 'API: Utilities',
  tags: ['modulo', 'lerp', 'Box', 'Cylinder', 'visible', 'scale'],
  docs: [
    'repo/modules/docs/api-utils.hbs',
    'repo/modules/docs/api-vector.hbs',
    'repo/modules/docs/api-anchor.hbs',
    'repo/modules/docs/api-shape.hbs',
    'repo/modules/docs/shapes-composite.hbs',
    'repo/modules/docs/shapes-basic.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
