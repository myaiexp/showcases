// vchart example: Axis hover and select interaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis hover and select interaction',
  summary:
    'With hover and select enabled on the band axis, its background rectangles react to the pointer: a pale fill on hover, a blue one when clicked, and the other labels dim through hover_reverse. The card re-rolls the data while the full view takes the pointer.',
  section: 'Concepts: Axes',
  tags: ['axes.hover', 'axes.select', 'background.state', 'label.state.hover_reverse'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/base-axis.md', 'repo/docs/assets/option/en/component/cartesian-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
