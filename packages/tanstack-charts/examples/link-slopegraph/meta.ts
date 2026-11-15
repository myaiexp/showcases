// tanstack-charts example: Slopegraph with link
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Slopegraph with link",
  summary:
    "Each row is one link from its Before value to its After value on a point scale. The color channel splits rows into up and down, and key keeps each segment tied to its city across updates.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['link', 'x1', 'y1', 'x2', 'y2', 'key', 'color', 'scalePoint'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
