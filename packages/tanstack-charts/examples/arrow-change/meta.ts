// tanstack-charts example: Arrows between two positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arrows between two positions",
  summary:
    "22 arrows each run from a row's previous position to its current one, colored by whether quality went up or down. headLength and headAngle set the head in pixels and degrees, and the head stays that size at any chart width.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['arrow', 'x1', 'y1', 'x2', 'y2', 'headLength', 'headAngle', 'color'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
