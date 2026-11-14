// observable-plot example: Axis: wrapped tick labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: wrapped tick labels',
  summary:
    'Long category names wrap onto several lines through the lineWidth option of the axis text (in ems), with extra marginBottom to make room.',
  section: 'Mark: Axis',
  tags: ['axisX', 'axisY', 'barY', 'lineWidth', 'marginBottom'],
  docs: ['repo/docs/marks/axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
