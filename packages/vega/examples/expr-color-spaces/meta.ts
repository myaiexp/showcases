// vega example: Expressions: rgb, hsl, lab and hcl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: rgb, hsl, lab and hcl",
  summary:
    "Four rows of 24 swatches, one per colour function, each sweeping a different channel while a single slider drives another, so the spaces' very different feel shows.",
  section: 'Expressions',
  tags: ["expression.rgb","expression.hsl","expression.lab","expression.hcl"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/sequence.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
