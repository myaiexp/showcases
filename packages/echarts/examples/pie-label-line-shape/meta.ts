// echarts example: Label guide line shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label guide line shape',
  summary:
    'Outside labels on a pie with crowded small sectors. Toggle avoidLabelOverlap and change the guide line length, length2, smooth and minTurnAngle to see how the lines bend.',
  section: 'Option: series.pie',
  tags: ['pie', 'avoidLabelOverlap', 'labelLine.length', 'labelLine.length2', 'labelLine.smooth', 'labelLine.minTurnAngle'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/label-line.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
