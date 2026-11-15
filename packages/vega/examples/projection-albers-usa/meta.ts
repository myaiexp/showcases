// vega example: Projections: albersUsa
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: albersUsa",
  summary:
    "The albersUsa composite puts Alaska and Hawaii in insets below the lower 48; the 50 state capitals are projected with geopoint and light up when hovered.",
  section: "Projections",
  tags: ["projection.type", "transform.geopoint", "transform.geoshape"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geopoint.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/data/us-10m.json", "repo/docs/data/us-state-capitals.json", "repo/docs/docs/marks/symbol.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
