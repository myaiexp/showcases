// vega example: Expressions: Normal Density and Quantile
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Normal Density and Quantile",
  summary:
    "A normal distribution's density (area) and cumulative curve (line) with mean and spread sliders, and a probability slider whose quantileNormal answer is marked on both axes.",
  section: 'Expressions',
  tags: ["expression.densityNormal","expression.cumulativeNormal","expression.quantileNormal","signal.bind"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/formula.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
