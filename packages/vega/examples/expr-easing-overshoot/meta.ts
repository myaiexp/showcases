// vega example: Expressions: Easing Overshoot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Easing Overshoot",
  summary:
    "The Back, Elastic and Bounce families in their In, Out and InOut variants, which leave the unit interval; a checkbox clamps every curve back into [0, 1].",
  section: 'Expressions',
  tags: ["expression.easeBack","expression.easeElastic","expression.easeBounce","expression.clamp"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/sequence.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
