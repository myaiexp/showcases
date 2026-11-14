// Zdog example: Hidden-backface carousel, one-sided signs on a spinning ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hidden-backface carousel',
  summary:
    'A ring of coloured signs turns around a golden ball. Each sign faces outward and has backface set to false, so the ones on the far side, which show their backs, are not drawn and you can see straight through to the ball. Untick the box and the backs appear as dark panels.',
  section: 'API: Shape',
  tags: ['Shape', 'backface', 'Rect', 'Anchor'],
  docs: ['repo/modules/docs/api-shape.hbs', 'repo/modules/docs/shapes-basic.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
