// tanstack-charts example: Groups and overlapping diagrams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Groups and overlapping diagrams",
  summary:
    "color alone only paints the cells of one shared partition. Adding z gives every group its own tessellation across the whole plot, so the cells of different groups overlap.",
  section: "Voronoi Mark",
  tags: ['voronoi', 'z', 'color'],
  docs: ['repo/docs/reference/marks/voronoi.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
