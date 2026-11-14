// Zdog example: Coin flip, a different colour on the back of a flat shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coin flip',
  summary:
    'A coin tossed in the air, gold with a star on one side and silver with a ring on the other. A flat shape has a front and a back, and the backface option gives the back its own colour. Symbols that set backface to false only appear while their own side faces you; the select changes what the plain disc does on its back.',
  section: 'API: Shape',
  tags: ['Shape', 'backface', 'Ellipse', 'Group', 'rotate'],
  docs: ['repo/modules/docs/api-shape.hbs', 'repo/modules/docs/group-concept.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
