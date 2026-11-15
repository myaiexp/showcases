// vega example: Window: Frames and Aggregates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Window: Frames and Aggregates",
  summary:
    "A running statistic over twenty values: choose the aggregate and the frame (rows before, rows after, or unbounded) and the line becomes a running total, a centred moving average, a forward-looking window and so on.",
  section: 'Transforms: Basic',
  tags: ["transform.window.frame", "transform.window.ops", "transform.window.sort", "transform.window.fields", "transform.window.as"],
  docs: ["repo/docs/docs/transforms/window.md", "repo/docs/docs/transforms/window.vg.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
