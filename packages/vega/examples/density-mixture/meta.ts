// vega example: Density: Mixture of Distributions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: Mixture of Distributions",
  summary:
    "The mixture distribution blends two normals by weights; the white line is the mixture and the green and orange fills are the weighted components, which move as the weight sliders change.",
  section: 'Transforms: Basic',
  tags: ["transform.density.distribution", "transform.formula"],
  docs: ["repo/docs/docs/transforms/density.md", "repo/docs/docs/transforms/formula.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
