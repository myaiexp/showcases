// vega example: Axis labelBound, labelFlush and labelFlushOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis labelBound, labelFlush and labelFlushOffset",
  summary:
    "End labels that stick out past the axis are hidden by labelBound (top axis) or tucked inside with labelFlush and pushed by labelFlushOffset (bottom axis).",
  section: "Axes",
  tags: ["axes.labelBound","axes.labelFlush","axes.labelFlushOffset"],
  docs: ["repo/docs/docs/axes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
