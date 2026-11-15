// vega example: Expressions: sampleNormal Histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: sampleNormal Histogram",
  summary:
    "Four hundred sampleNormal draws binned into a histogram, with the expected counts from densityNormal drawn over it; mean and spread sliders and a Draw again button re-run the sampling.",
  section: 'Expressions',
  tags: ["expression.sampleNormal","expression.densityNormal","transform.bin","transform.aggregate"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/bin.md","repo/docs/docs/transforms/aggregate.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
