// vega example: Expressions: lerp and interpolateLinear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: lerp and interpolateLinear",
  summary:
    "Five control values drawn two ways: lerp heads straight from the first to the last, interpolateLinear follows every entry; a fraction slider moves a dot on each curve.",
  section: 'Expressions',
  tags: ["expression.lerp","expression.interpolateLinear","expression.sequence","transform.flatten"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/flatten.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
