// globe-gl example: Points: pointsMerge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Points: pointsMerge",
  summary:
    "pointsMerge(true) merges every column into a single Three.js mesh: 6,000 random points look exactly the same but draw in a handful of calls instead of one per point. The full view counts draw calls as you toggle it. Merged points give up per-point events and transitions.",
  section: "Points Layer",
  tags: ["pointsMerge", "pointsData", "renderer"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
