// tanstack-charts example: Vector field with anchors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Vector field with anchors",
  summary:
    "A 12 by 8 grid of wind vectors. length reads each cell's speed in pixels and rotate its bearing in clockwise degrees (zero points up). The anchor option chooses whether the tail, middle or head sits on the grid point.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['vector', 'length', 'rotate', 'anchor', 'color'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
