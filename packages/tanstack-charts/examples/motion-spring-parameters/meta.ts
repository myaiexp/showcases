// tanstack-charts example: Stiffness, damping and mass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stiffness, damping and mass',
  summary:
    'A spring has stiffness, damping and mass, and no duration. Raising stiffness makes it quicker, raising damping removes the overshoot and raising mass makes it heavier and slower. Sliders in the full view set the three values and the bars retarget from where they are.',
  section: 'Motion',
  tags: ['spring', 'stiffness', 'damping', 'mass', 'ChartSpringOptions'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
