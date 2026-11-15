// tanstack-charts example: Scatter with marginal histograms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scatter with marginal histograms",
  summary:
    "composeViews places a scatter, a histogram above it and a histogram beside it in one grid. shareX ties the top histogram to the scatter's x scale and shareY ties the side one to its y scale, so bins line up with the points. Both histograms are derived with binX and binY.",
  section: "View Composition",
  tags: ["composeViews", "grid", "shareX", "shareY", "binX", "binY"],
  docs: ["repo/docs/reference/view-composition.md", "repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
