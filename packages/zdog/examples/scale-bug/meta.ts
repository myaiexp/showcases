// Zdog example: Scale bug, composite shapes under uneven scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scale bug',
  summary:
    'A dome, a can and a hat, all drawn by Zdog\'s composite shapes. Scaling their parent evenly to 2 simply doubles them, but stretching only one axis with { y: 2 } is a documented known bug and they draw wrongly. Flip between the three scales to see it, and size those shapes with their own options instead.',
  section: 'Extras',
  tags: ['scale', 'Hemisphere', 'Cylinder', 'Cone', 'Anchor'],
  docs: ['repo/content/extras.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
