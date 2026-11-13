// Perspective example: perspective-click drill-down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "perspective-click drill-down",
  summary:
    "Clicking a cell of the grouped grid fires perspective-click, whose detail.config holds the filters for that cell; the second viewer restores them to list the matching orders.",
  section: "Events",
  tags: ["perspective-click", "detail.config", "filter", "restore", "drill-down"],
  docs: ["repo/docs/md/how_to/javascript/events.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
