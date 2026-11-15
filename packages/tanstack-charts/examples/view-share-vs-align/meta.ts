// tanstack-charts example: shareX against alignX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shareX against alignX",
  summary:
    "shareX needs the two views to resolve the same x domain and mapping; alignX only lines their plot edges up and lets each keep its own domain. Two charts with different x ranges are linked each way: alignX works, and shareX throws an error that the readout shows instead of drawing a partial scene.",
  section: "View Composition",
  tags: ["composeViews", "shareX", "alignX", "grid"],
  docs: ["repo/docs/reference/view-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
