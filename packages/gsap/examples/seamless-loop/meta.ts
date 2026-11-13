// gsap example: Seamless horizontal loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seamless horizontal loop',
  summary:
    'A row of cards slides left and re-enters from the right forever. The official horizontalLoop() helper returns a timeline with next(), previous() and toIndex() that always take the shortest way round.',
  section: 'Helper functions',
  tags: ['horizontalLoop', 'timeline', 'tweenTo', 'xPercent', 'toArray', 'wrap'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/seamlessLoop.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
