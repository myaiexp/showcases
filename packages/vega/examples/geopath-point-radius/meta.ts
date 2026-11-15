// vega example: GeoPath: pointRadius and as
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoPath: pointRadius and as",
  summary:
    "geopath draws each capital as a circle whose radius comes from an expression over the feature's properties, written to a field named with as.",
  section: "Transforms: Geographic",
  tags: ["transform.geopath.pointRadius", "transform.geopath.as", "transform.geopath.field", "transform.formula"],
  docs: ["repo/docs/docs/transforms/geopath.md", "repo/docs/docs/transforms/formula.md", "repo/docs/docs/marks/path.md", "repo/docs/docs/projections.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
