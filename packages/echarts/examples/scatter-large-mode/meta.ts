// echarts example: Scatter large mode on 60,000 points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter large mode on 60,000 points',
  summary:
    '60,000 scatter points drawn with large and largeThreshold. The full view toggles large, raises the threshold above the point count, and shows that per-item styles (three red points) only apply when large mode is off.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'large', 'largeThreshold', 'itemStyle'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/partial/large.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
