// observable-plot example: Tip: map labels with geoCentroid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip: map labels with geoCentroid',
  summary:
    'State names as tips at polygon centroids from the geoCentroid transform, with textPadding shrinking the boxes.',
  section: 'Mark: Tip',
  tags: ['tip', 'geoCentroid', 'textPadding', 'albers-usa'],
  docs: ['repo/docs/marks/tip.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
