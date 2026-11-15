// vega example: KDE: Bandwidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "KDE: Bandwidth",
  summary:
    "The same two-cluster sample smoothed with three fixed bandwidths, each curve drawn from the number of steps in the select: few steps show the straight segments between samples.",
  section: 'Transforms: Basic',
  tags: ["transform.kde.bandwidth", "transform.kde.steps", "transform.kde.extent"],
  docs: ["repo/docs/docs/transforms/kde.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
