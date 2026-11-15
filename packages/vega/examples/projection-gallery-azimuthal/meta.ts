// vega example: Projections: Azimuthal Gallery
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: Azimuthal Gallery",
  summary:
    "Orthographic, stereographic, gnomonic, azimuthal equal-area and equidistant globes around one centre, turned together by rotate; one orthographic cell opens clipAngle to 90.",
  section: "Projections",
  tags: ["projection.type", "projection.rotate", "projection.clipAngle", "projection.scale"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
