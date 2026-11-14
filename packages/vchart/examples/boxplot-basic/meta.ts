// vchart example: BoxPlot: five-number summary
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BoxPlot: five-number summary',
  summary:
    'A boxPlot chart reads five fields per category: minField, q1Field, medianField, q3Field and maxField draw the whiskers, the box and the median line. New statistics arrive on a timer.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['boxPlot', 'minField', 'q1Field', 'medianField', 'q3Field', 'maxField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/BoxPlot.md',
    'repo/docs/assets/option/en/series/box-plot.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
