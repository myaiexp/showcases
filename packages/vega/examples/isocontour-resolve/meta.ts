// vega example: Isocontour: resolve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Isocontour: resolve",
  summary:
    "Two point clouds, one with four times the points, each with its own density grid: independent resolve cuts each at its own levels, shared uses one set so the sparse cloud gets fewer.",
  section: "Transforms: Geographic",
  tags: ["transform.isocontour.resolve", "transform.kde2d.groupby"],
  docs: ["repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
