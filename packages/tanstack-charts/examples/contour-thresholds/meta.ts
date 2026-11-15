// tanstack-charts example: Contour thresholds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour thresholds",
  summary:
    "thresholds takes a number (an approximate level count) or an exact list of levels. A few levels give coarse terraces; a long list approaches a smooth surface. The color domain is fixed so levels keep their colors.",
  section: "Contour Mark",
  tags: ['contour', 'thresholds'],
  docs: ['repo/docs/reference/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
