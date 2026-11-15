// vega example: Expressions: Log-Normal and Uniform Samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Log-Normal and Uniform Samples",
  summary:
    "Five hundred sampleLogNormal and sampleUniform draws as overlapping histograms, each with its density curve; four sliders set the log-normal and uniform parameters.",
  section: 'Expressions',
  tags: ["expression.sampleLogNormal","expression.sampleUniform","expression.densityLogNormal","expression.densityUniform"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/bin.md","repo/docs/docs/transforms/aggregate.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
