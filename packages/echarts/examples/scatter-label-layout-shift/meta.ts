// echarts example: Scatter labels with labelLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter labels with labelLayout',
  summary:
    '26 labelled points that overlap. Step through labelLayout settings: none, hideOverlap, moveOverlap shiftY, and a function that stacks the labels in a right-hand column joined by label lines.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'label', 'labelLine', 'labelLayout', 'hideOverlap', 'moveOverlap'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/partial/label-layout.md',
    'repo/en/option/partial/label.md',
    'repo/en/option/partial/label-line.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
