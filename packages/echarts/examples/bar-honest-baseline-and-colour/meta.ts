// echarts example: Bar chart guidelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar chart guidelines: baseline, colour and sorting',
  summary:
    'The basic-bar specification as switches: a y-axis that starts at 0 or is truncated, one colour with a contrasting highlight or a colour per bar, sorted or unsorted categories, and bar gaps that are wide or too tight.',
  section: 'Best Practices',
  tags: ['bar', 'yAxis.min', 'barCategoryGap', 'colorBy', 'itemStyle'],
  docs: [
    'repo/contents/en/best-practices/specification/bar/basic-bar.md',
    'repo/en/option/series/bar.md',
    'repo/en/option/component/axis-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
