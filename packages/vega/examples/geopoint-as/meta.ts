// vega example: GeoPoint: fields and as
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoPoint: fields and as",
  summary:
    "geopoint projects the capitals' longitude and latitude to pixel fields named px and py, and the same marks re-draw as the projection type changes.",
  section: "Transforms: Geographic",
  tags: ["transform.geopoint", "transform.geopoint.fields", "transform.geopoint.as", "projection.type"],
  docs: ["repo/docs/docs/transforms/geopoint.md", "repo/docs/docs/transforms/geopoint.vg.json", "repo/docs/docs/projections.md", "repo/docs/docs/marks/symbol.md", "repo/docs/docs/transforms/filter.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
