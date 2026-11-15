// vega example: Window: Lag and Lead
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Window: Lag and Lead",
  summary:
    "Twelve values with the value some rows earlier (red bar) and later (green bar) pulled onto each row by lag and lead. The offset slider is the parameter, and rows with no such neighbour have null and draw no bar.",
  section: 'Transforms: Basic',
  tags: ["transform.window.ops", "transform.window.params", "transform.window.fields", "transform.window.as"],
  docs: ["repo/docs/docs/transforms/window.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
