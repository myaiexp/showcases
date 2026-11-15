// tanstack-charts example: Custom dot layout with createDotLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom dot layout with createDotLayout',
  summary:
    'createDotLayout lets a resolver place dots from the final plot bounds. This one stacks the dots into evenly spaced rows by input order, ignoring collisions, and the y scale stays null just as with dodgeY. The select compares it with dodgeY on the same values.',
  section: 'Dodge Layouts',
  tags: ['createDotLayout', 'resolve', 'dodgeY'],
  docs: ['repo/docs/reference/marks/dodge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
