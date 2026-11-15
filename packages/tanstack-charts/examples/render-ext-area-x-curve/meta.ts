// tanstack-charts example: A hand-written AreaXCurve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A hand-written AreaXCurve",
  summary:
    "An AreaXCurve has one method, areaX(right, left), that returns path data for a band that runs along the y axis. This version draws the right edge, then the left edge backwards, with a small bevel at each end, and areaX uses it through its curve option.",
  section: "Custom Extensions",
  tags: ['AreaXCurve', 'areaX', 'curve'],
  docs: ['repo/docs/reference/custom-extensions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
