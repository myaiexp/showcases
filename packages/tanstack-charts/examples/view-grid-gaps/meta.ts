// tanstack-charts example: Grid gap, rowGap and columnGap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid gap, rowGap and columnGap",
  summary:
    "gap sets the space between tracks in both directions, and rowGap or columnGap override it for one direction. A 2 by 2 grid of four small charts takes the three values from sliders, and shrinking the frame shrinks the gaps' neighbours before anything overlaps.",
  section: "View Composition",
  tags: ["composeViews", "grid", "gap", "rowGap", "columnGap"],
  docs: ["repo/docs/reference/view-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
