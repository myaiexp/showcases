// tanstack-charts example: Chart for the reader's task
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart for the reader\'s task',
  summary:
    'Pick a reader task and see the first-choice chart: line, horizontal bars, scatterplot, histogram, range area, stacked bars or heatmap cells.',
  section: 'Choosing a Chart',
  tags: ['lineY', 'barX', 'dot', 'binX', 'areaY', 'barY', 'cell'],
  docs: [
    'repo/docs/guides/choosing-a-chart.md',
    'repo/docs/concepts/marks-and-layering.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
