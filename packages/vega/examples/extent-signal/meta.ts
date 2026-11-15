// vega example: Extent: Range in a Signal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Extent: Range in a Signal",
  summary:
    "Twenty-four readings with the extent transform bound to a signal. The band and the two rules are drawn from that signal and jump to the new min and max when the data is replaced.",
  section: 'Transforms: Basic',
  tags: ["transform.extent.signal", "transform.extent.field"],
  docs: ["repo/docs/docs/transforms/extent.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
