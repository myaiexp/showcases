// vega example: Expressions: panLinear and zoomLinear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: panLinear and zoomLinear",
  summary:
    "Drag a sine curve sideways and turn the wheel over it: panLinear moves the x domain by the drag as a fraction of the range, and zoomLinear scales it around the pointer.",
  section: 'Expressions',
  tags: ["expression.panLinear","expression.zoomLinear","scale.domain.signal","signal.on.between"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/scales.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
