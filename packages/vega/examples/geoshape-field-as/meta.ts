// vega example: GeoShape: field and as
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoShape: field and as",
  summary:
    "Two GeoJSON fields of the capitals data, a point and a square of adjustable size, become two shape instances through geoshape field and as, and two shape marks draw them.",
  section: "Transforms: Geographic",
  tags: ["transform.geoshape.field", "transform.geoshape.as", "mark.shape", "transform.formula"],
  docs: ["repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/geoshape.vg.json", "repo/docs/docs/marks/shape.md", "repo/docs/docs/transforms/formula.md", "repo/docs/docs/projections.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
