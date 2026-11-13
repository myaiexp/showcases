// gsap example: Smooth origin change
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smooth origin change',
  summary:
    'Two identical boxes shrink around their bottom-right corner, then the transform origin moves to top-left. The plain change makes the left box jump; smoothOriginChange() keeps the right one exactly in place.',
  section: 'Helper functions',
  tags: ['smoothOriginChange', 'transformOrigin', 'getBoundingClientRect', 'scale'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/smoothOriginChange.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
