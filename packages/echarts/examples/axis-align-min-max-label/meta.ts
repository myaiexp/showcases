// echarts example: Aligning the first and last axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aligning the first and last axis labels',
  summary:
    'A scatter plot with bold end labels. Choose how the x axis aligns its min and max tick labels (left, center, right) and how the y axis aligns its own vertically, or hide the end labels with showMinLabel and showMaxLabel.',
  section: 'Option: Components',
  tags: ['axisLabel', 'alignMinLabel', 'alignMaxLabel', 'verticalAlignMinLabel', 'verticalAlignMaxLabel', 'showMinLabel', 'showMaxLabel'],
  docs: [
    'repo/en/option/component/axis-common.md',
    'repo/en/option/component/x-axis.md',
    'repo/en/option/component/y-axis.md',
    'repo/contents/en/basics/release-note/5-5-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
