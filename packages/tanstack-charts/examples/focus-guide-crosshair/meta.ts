// tanstack-charts example: Crosshair with edge labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crosshair with edge labels",
  summary:
    "One focusGuideX mark with both xRule and yRule draws a crosshair at the focused reading, plus a month label on the x edge and a value label on the y edge.",
  section: "Focus Guide Marks",
  tags: ['focusGuideX', 'xRule', 'yRule', 'xLabel', 'yLabel'],
  docs: [
    'repo/docs/reference/marks/focus-guide.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
