// vega example: Expressions: Math Waves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Math Waves",
  summary:
    "Four curves from sin, cos, abs, tan and clamp, computed by formula over a sequence of x values; sliders change the frequency, amplitude and clamp limit.",
  section: 'Expressions',
  tags: ["expression.sin","expression.clamp","transform.formula","transform.sequence"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/formula.md","repo/docs/docs/transforms/sequence.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
