// tanstack-charts example: A responsive child view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A responsive child view",
  summary:
    "A child can be a builder that receives its allocated frame, so it adapts to the space composeViews gives it. The right-hand view lists its own width and picks its bar padding from that width; the slider changes the width of the left track and the child rebuilds.",
  section: "View Composition",
  tags: ["composeViews", "responsive", "defineChart", "ChartBuildContext"],
  docs: ["repo/docs/reference/view-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
