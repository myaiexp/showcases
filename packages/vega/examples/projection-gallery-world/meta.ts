// vega example: Projections: World Gallery
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: World Gallery",
  summary:
    "Six whole-world projections side by side, each fitted into its own cell with fit and extent; a shared rotate signal slides the map seam round.",
  section: "Projections",
  tags: ["projection.fit", "projection.extent", "projection.rotate", "projection.type"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/graticule.md", "repo/docs/data/world-110m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
