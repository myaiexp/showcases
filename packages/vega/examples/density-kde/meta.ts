// vega example: Density: KDE Distribution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: KDE Distribution",
  summary:
    "A kernel density estimate of a two-cluster sample, drawn as an area over an orange rug of the observations. A narrow bandwidth gives a spiky curve, a wide one blurs the clusters together.",
  section: 'Transforms: Basic',
  tags: ["transform.density.distribution", "transform.density.steps"],
  docs: ["repo/docs/docs/transforms/density.md", "repo/docs/docs/transforms/kde.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
