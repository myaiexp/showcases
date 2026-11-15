// vega example: Expressions: Distribution Functions Table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Distribution Functions Table",
  summary:
    "The density, cumulative and quantile functions of the normal, log-normal and uniform distributions, evaluated at an x and a probability you set, including uniform's one-argument max form.",
  section: 'Expressions',
  tags: ["expression.cumulativeLogNormal","expression.quantileUniform","expression.densityUniform","signal.bind"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
