// gsap example: FLIP helper
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FLIP helper',
  summary:
    'Numbered tiles are shuffled in the DOM and glide to their new slots. The small flip() helper records each tile\'s box, makes the change, then tweens from the old position with function-based x and y.',
  section: 'Helper functions',
  tags: ['flip', 'FLIP', 'getBoundingClientRect', 'function-based values', 'stagger'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/FLIP.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
