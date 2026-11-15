// tanstack-charts example: findNearestPoint on a static scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "findNearestPoint on a static scene",
  summary:
    "findNearestPoint answers a pointer query on a compiled scene with no host. The page converts the pointer to scene coordinates, asks for the nearest point within maxDistance, and draws a marker on the SVG. The select restricts the candidate list to one series by passing points as the last argument.",
  section: "Runtime and Scene",
  tags: ['findNearestPoint', 'maxDistance', 'candidate points', 'createChartScene'],
  docs: ['repo/docs/reference/runtime-and-scene.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
