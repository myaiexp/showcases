// vega example: Projections: parallels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: parallels",
  summary:
    "A conic equal-area map whose two standard parallels are signals; equal parallels at zero turn the cone into a cylinder.",
  section: "Projections",
  tags: ["projection.parallels", "projection.type", "projection.center", "projection.rotate"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
