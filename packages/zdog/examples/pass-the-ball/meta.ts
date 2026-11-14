// Zdog example: Pass the ball, re-parenting a ball between two turntables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pass the ball',
  summary:
    'A ball sits on a spinning turntable, hops across the gap and lands on the other one, which spins the opposite way. While it sits on a turntable it turns with it, because it is that turntable\'s child. The hop takes it out of one parent and into the next with removeChild and addChild.',
  section: 'API: Anchor',
  tags: ['Anchor', 'addChild', 'removeChild', 'remove', 'Cylinder', 'lerp', 'rotate'],
  docs: ['repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/api-utils.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
