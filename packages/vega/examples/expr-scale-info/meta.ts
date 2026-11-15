// vega example: Expressions: bandspace, bandwidth, domain and range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: bandspace, bandwidth, domain and range",
  summary:
    "A bar chart whose height is bandspace() of a row count and two paddings, beside a table where bandwidth, domain, range, scale and copy read the band scale back, including the not-found answers.",
  section: 'Expressions',
  tags: ["expression.bandspace","expression.bandwidth","expression.domain","expression.range","expression.copy","scale.band"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/scales.md","repo/docs/docs/specification.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
