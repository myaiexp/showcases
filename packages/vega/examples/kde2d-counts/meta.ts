// vega example: kde2d: counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "kde2d: counts",
  summary:
    "The same density as probabilities or as smoothed point counts: the counts flag changes the level values, which the label reports with an extent transform.",
  section: "Transforms: Geographic",
  tags: ["transform.kde2d.counts", "transform.extent"],
  docs: ["repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/extent.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
