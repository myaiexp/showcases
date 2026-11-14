// Zdog example: Ladybug dome, a Hemisphere with a cream belly as backface
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ladybug dome',
  summary:
    'A ladybug whose shell is a single Hemisphere. The dome has one colour and its flat base has another, set with backface, so when she rolls onto her back you see the cream belly instead. Spots are dots placed on the curve of the dome.',
  section: 'Shapes',
  tags: ['Hemisphere', 'backface', 'diameter', 'stroke', 'Shape', 'rotate'],
  docs: ['repo/modules/docs/shapes-composite.hbs', 'repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
