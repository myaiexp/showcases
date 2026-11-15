// d2 example: 1:1 ratio shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '1:1 ratio shapes',
  summary:
    'A long label widens a `circle` or `square`, and D2 makes it taller by the same amount to keep a 1:1 ratio. Explicit `width` and `height` have to be equal for these shapes in this D2 build (the docs say the larger value wins, but v0.7 rejects unequal values).',
  section: 'Shapes',
  tags: ['circle', 'square', 'width', 'height'],
  docs: ['repo/docs/tour/shapes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
