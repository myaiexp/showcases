// vega example: Expressions: scale and invert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: scale and invert",
  summary:
    "Move over a scatter with a linear and a log axis: invert reads the data values under the pointer from pixel positions, and scale sends them back to an orange ring that lands on the cursor.",
  section: 'Expressions',
  tags: ["expression.invert","expression.scale","scale.log","signal.on"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/scales.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
