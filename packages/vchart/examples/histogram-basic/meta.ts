// vchart example: Histogram: x, x2 and y fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Histogram: x, x2 and y fields',
  summary:
    'A histogram draws one bar per interval: xField and x2Field hold the left and right edge on a continuous axis and yField the frequency. The bars regroup as a new sample arrives.',
  section: 'Bar',
  tags: ['histogram', 'xField', 'x2Field', 'yField', 'tooltip.mark.content'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Histogram.md',
    'repo/docs/assets/option/en/chart/histogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
