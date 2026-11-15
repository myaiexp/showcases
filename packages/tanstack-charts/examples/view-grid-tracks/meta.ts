// tanstack-charts example: Fixed and flexible grid tracks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed and flexible grid tracks",
  summary:
    "grid tracks are either a fixed size in pixels or a grow weight with optional min and max. A left rail, a main chart and a right rail get their sizes from sliders: fixed rails keep their pixels while the main track takes what remains, and a max caps a flexible track.",
  section: "View Composition",
  tags: ["composeViews", "grid", "size", "grow", "min", "max"],
  docs: [
    'repo/docs/reference/view-composition.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
