// echarts example: Pie labels in a column with labelLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pie labels in a column with labelLayout',
  summary:
    'Browser shares with outside labels. A labelLayout callback pushes the labels to the left and right edges and re-aims the guide lines; compare it with moveOverlap shiftY and the default layout.',
  section: 'Option: series.pie',
  tags: ['pie', 'labelLayout', 'labelLinePoints', 'moveOverlap', 'label.position'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/label-layout.md', 'repo/en/option/partial/label-line.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
