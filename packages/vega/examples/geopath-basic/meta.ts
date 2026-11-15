// vega example: GeoPath: State Outlines as Paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoPath: State Outlines as Paths",
  summary:
    "geopath turns each state's GeoJSON into an SVG path string that a path mark draws and highlights on hover.",
  section: "Transforms: Geographic",
  tags: ["transform.geopath", "transform.geopath.projection", "mark.path"],
  docs: ["repo/docs/docs/transforms/geopath.md", "repo/docs/docs/transforms/geopath.vg.json", "repo/docs/docs/projections.md", "repo/docs/docs/marks/path.md", "repo/docs/docs/transforms/geopoint.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
