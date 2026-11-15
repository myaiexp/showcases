// vega example: Projections: Types Cycled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: Types Cycled",
  summary:
    "One world map re-projected through fourteen of the documented types, albers to transverseMercator, each with a scale that suits it; the full view has a select.",
  section: "Projections",
  tags: ["projection.type", "projection.scale", "projection.translate", "signal.bind"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/docs/data.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
