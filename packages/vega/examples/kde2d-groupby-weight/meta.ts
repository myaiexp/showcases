// vega example: kde2d: groupby and weight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "kde2d: groupby and weight",
  summary:
    "One density grid per group, plain (dashed) and weighted (filled): points of group B count five times, so its contours grow while group A's stay put.",
  section: "Transforms: Geographic",
  tags: ["transform.kde2d.groupby", "transform.kde2d.weight", "transform.isocontour.thresholds"],
  docs: ["repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
