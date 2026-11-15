// vega example: Formula: Derived Fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Formula: Derived Fields",
  summary:
    "A sequence of x values gets two sine fields from formula transforms. The live one follows the frequency and amplitude sliders; the one with initonly keeps the grey dashed curve it first had.",
  section: 'Transforms: Basic',
  tags: ["transform.formula.expr", "transform.formula.as", "transform.formula.initonly", "transform.sequence"],
  docs: ["repo/docs/docs/transforms/formula.md", "repo/docs/docs/transforms/sequence.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
