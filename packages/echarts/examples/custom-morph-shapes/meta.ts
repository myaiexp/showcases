// echarts example: Morphing custom shapes into a pie
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Morphing custom shapes into a pie',
  summary:
    'One series id, three looks: a custom series drawing rects, the same custom series drawing circles, and a built-in pie. universalTransition links the elements and morph lets a rect turn into a circle and then into a sector. Click a button to morph, or draw new data.',
  section: 'Animation',
  tags: ['custom', 'renderItem', 'universalTransition', 'morph', 'id', 'pie'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/option/partial/universal-transition.md',
    'repo/contents/en/basics/release-note/5-2-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
