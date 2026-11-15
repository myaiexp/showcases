// vega example: Expressions: sequence()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: sequence()",
  summary:
    "The sequence function drawn as dots on a number line from start, stop and step sliders, with its reverse numbered underneath; negative steps count down and equal ends give no dots.",
  section: 'Expressions',
  tags: ["expression.sequence","expression.reverse","transform.flatten"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/sequence.md","repo/docs/docs/transforms/flatten.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
