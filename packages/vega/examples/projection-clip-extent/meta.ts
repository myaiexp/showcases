// vega example: Projections: clipExtent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: clipExtent",
  summary:
    "An equirectangular world clipped to a dashed pixel window whose four edges are signals; the card moves and resizes the window.",
  section: "Projections",
  tags: ["projection.clipExtent"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/docs/marks/rect.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
