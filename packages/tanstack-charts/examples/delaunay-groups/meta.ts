// tanstack-charts example: Triangulation per group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Triangulation per group",
  summary:
    "With z set to the cylinder group each group is triangulated on its own and the links take the group color. Without z one triangulation joins all cars, including links between different groups.",
  section: "Delaunay Link Mark",
  tags: ['delaunayLink', 'z', 'color'],
  docs: ['repo/docs/reference/marks/delaunay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
