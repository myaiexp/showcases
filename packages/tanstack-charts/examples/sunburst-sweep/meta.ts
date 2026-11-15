// tanstack-charts example: Partial sweep
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partial sweep",
  summary:
    "The enclosing polar mark owns the angular range, so giving it a start and end angle squeezes the same hierarchy into a half circle or any other arc. The slider changes the sweep from 90 to 360 degrees.",
  section: "Sunburst Mark",
  tags: ['sunburst', 'polar', 'startAngle', 'endAngle'],
  docs: ['repo/docs/reference/marks/sunburst.md', 'repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
