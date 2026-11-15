// vega example: GeoJSON: Fit a Projection to Points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON: Fit a Projection to Points",
  summary:
    "The geojson transform gathers the longitude and latitude of the capitals east of a moving limit into one collection, and the projection fits to it.",
  section: "Transforms: Geographic",
  tags: ["transform.geojson", "transform.geojson.fields", "transform.geojson.signal", "projection.fit", "projection.extent"],
  docs: ["repo/docs/docs/transforms/geojson.md", "repo/docs/docs/projections.md", "repo/docs/docs/transforms/geopoint.md", "repo/docs/docs/transforms/filter.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
