// vega example: Density: Normal Distribution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: Normal Distribution",
  summary:
    "A density transform with no input data: 120 samples of a normal pdf over [-8, 8], redrawn as the mean and standard deviation signals move.",
  section: 'Transforms: Basic',
  tags: ["transform.density.distribution", "transform.density.extent", "transform.density.steps", "transform.density.as"],
  docs: ["repo/docs/docs/transforms/density.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
