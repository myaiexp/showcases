// vega example: KDE: Counts and Cumulative
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "KDE: Counts and Cumulative",
  summary:
    "One two-peaked sample of 60 values smoothed four ways: probability density, smoothed counts (area equal to 60), and the cumulative version of each.",
  section: 'Transforms: Basic',
  tags: ["transform.kde.counts", "transform.kde.cumulative", "transform.kde.extent", "transform.kde.steps"],
  docs: ["repo/docs/docs/transforms/kde.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
