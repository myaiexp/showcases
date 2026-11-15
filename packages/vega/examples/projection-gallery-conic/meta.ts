// vega example: Projections: Conic and US Gallery
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: Conic and US Gallery",
  summary:
    "The lower 48 states under albers, albersUsa, the three plain conic types and identity, each fitted to its cell; a central-meridian signal tilts the plain cones.",
  section: "Projections",
  tags: ["projection.type", "projection.rotate", "projection.center", "projection.reflectY", "projection.fit"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/filter.md", "repo/docs/data/us-10m.json", "repo/docs/docs/data.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
