// tanstack-charts example: Vertical focus rule with marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Vertical focus rule with marker",
  summary:
    "A line of monthly readings. While the pointer is over it, a vertical rule and a dot mark the nearest reading. focusGuideX draws only for the focused datum, so it adds no points or tooltip rows of its own.",
  section: "Focus Guide Marks",
  tags: ['focusGuideX', 'lineY', 'marker', 'focus'],
  docs: ['repo/docs/reference/marks/focus-guide.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
