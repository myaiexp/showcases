// Perspective example: Master/detail cross-filtering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Master/detail cross-filtering",
  summary:
    "The region grid is a master panel: selecting a region writes global_filters, which the bar chart and the order list apply as an overlay. Set or clear global_filters and masters directly, and watch perspective-global-filter-update.",
  section: "Layouts",
  tags: ["masters", "global_filters", "restoreWorkspace", "perspective-global-filter-update", "cross-filter"],
  docs: ["repo/docs/md/how_to/javascript/layout.md", "repo/docs/md/how_to/javascript/events.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
