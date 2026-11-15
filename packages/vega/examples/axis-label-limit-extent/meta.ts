// vega example: Axis labelLimit, minExtent and maxExtent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis labelLimit, minExtent and maxExtent",
  summary:
    "Long category labels truncated by labelLimit; minExtent and maxExtent then decide how far the y-axis title sits from them.",
  section: "Axes",
  tags: ["axes.labelLimit","axes.minExtent","axes.maxExtent","axes.titlePadding"],
  docs: ["repo/docs/docs/axes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
