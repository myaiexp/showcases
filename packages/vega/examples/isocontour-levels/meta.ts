// vega example: Isocontour: levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Isocontour: levels",
  summary:
    "The kde2d density of two point clouds cut into 2 to 16 equally spaced isocontour levels and drawn with geoshape, shaded by level value.",
  section: "Transforms: Geographic",
  tags: ["transform.isocontour", "transform.isocontour.levels", "transform.kde2d", "transform.geoshape"],
  docs: ["repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
