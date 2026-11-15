// vega example: Projections: precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: precision",
  summary:
    "The adaptive resampling threshold of an azimuthal map, from the smooth default 0.7 pixels to 60, where long straight edges appear.",
  section: "Projections",
  tags: ["projection.precision", "transform.graticule.precision"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
