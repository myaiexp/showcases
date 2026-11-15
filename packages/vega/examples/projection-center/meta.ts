// vega example: Projections: center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: center",
  summary:
    "A Mercator map whose center longitude and latitude sit under a fixed cross; the card slides it from city to city.",
  section: "Projections",
  tags: ["projection.center", "projection.scale", "projection.translate"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/docs/marks/symbol.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
