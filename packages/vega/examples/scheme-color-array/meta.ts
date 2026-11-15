// vega example: Scheme from a Color Array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scheme from a Color Array",
  summary:
    "Three colours (blue, pale yellow, red) become a scheme: for each interpolation method, a ramp and seven swatches sampled with count. The lit row steps down the list.",
  section: "Schemes",
  tags: ['scale.range.scheme','scale.interpolate','scheme.count'],
  docs: ['repo/docs/docs/schemes.md','repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
