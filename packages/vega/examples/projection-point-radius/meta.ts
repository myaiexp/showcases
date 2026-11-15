// vega example: Projections: pointRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: pointRadius",
  summary:
    "The 50 state capitals as GeoJSON Point features drawn by geoshape; the projection's pointRadius sets their size.",
  section: "Projections",
  tags: ["projection.pointRadius", "transform.geoshape", "transform.formula"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/formula.md", "repo/docs/docs/marks/shape.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
