// vega example: Voronoi: Extent and Size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Voronoi: Extent and Size",
  summary:
    "Two voronoi diagrams over the same points: one clipped by size, one by an extent that shrinks with a slider.",
  section: "Transforms: Layout",
  tags: ["transform.voronoi.size", "transform.voronoi.extent"],
  docs: ["repo/docs/docs/transforms/voronoi.md", "repo/docs/docs/transforms/voronoi.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/marks/group.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
