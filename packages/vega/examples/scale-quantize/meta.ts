// vega example: Quantize Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Quantize Scale",
  summary:
    "The same skewed values as the quantile example, now cut into uniform value ranges. Each colour covers the same stretch of the axis, so most dots fall in the first few colours.",
  section: "Scales",
  tags: ['scale.type','scale.range.scheme','scale.range.count'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
