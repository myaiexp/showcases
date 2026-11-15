// vega example: Projections: clipAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: clipAngle",
  summary:
    "An azimuthal equidistant map cut to a circle of growing radius around its centre; clipAngle runs from 10 to 170 degrees.",
  section: "Projections",
  tags: ["projection.clipAngle", "projection.type"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
