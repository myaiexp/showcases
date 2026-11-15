// vega example: Density: PDF and CDF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: PDF and CDF",
  summary:
    "A normal and a uniform distribution sampled over [0, 10]. The method toggles between the pdf (bell and plateau) and the cdf (both curves climbing to 1).",
  section: 'Transforms: Basic',
  tags: ["transform.density.method", "transform.density.distribution", "signal.bind"],
  docs: ["repo/docs/docs/transforms/density.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
