// observable-plot example: Bar: warming stripes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: warming stripes',
  summary:
    'Without a y channel each bar spans the chart; barX colors one stripe per year by temperature anomaly with interval 1 and inset 0.',
  section: 'Mark: Bar',
  tags: ['barX', 'fill', 'interval', 'inset', 'scheme'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/hadcrut.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
