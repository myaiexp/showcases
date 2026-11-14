// vchart example: Axis range: min and max
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis range: min and max',
  summary:
    'min and max pin the ends of a value axis and take priority over zero and nice. Two sliders move them over the same line chart; the card steps through four ranges, and values outside the range are clipped by the region.',
  section: 'Concepts: Axes',
  tags: ['axes.min', 'axes.max', 'linear axis'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/linear-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
