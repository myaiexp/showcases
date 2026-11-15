// tanstack-charts example: Overview and detail from app state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overview and detail from app state",
  summary:
    "An overview chart sits above a detail chart in one grid, alignX lines up their plot edges while their x domains differ. The viewport is plain application state: the sliders set a start and a length, the detail definition takes them as its domain, and the overview draws the same window as a shaded range.",
  section: "View Composition",
  tags: ["composeViews", "grid", "alignX", "rect", "lineY"],
  docs: [
    'repo/docs/reference/view-composition.md',
    'repo/docs/guides/faceting-and-composition.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
