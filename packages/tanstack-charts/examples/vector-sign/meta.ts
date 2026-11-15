// tanstack-charts example: Constant length, rotation and negative length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Constant length, rotation and negative length",
  summary:
    "length and rotate also take plain numbers. All 28 vectors share one pixel length and a clockwise rotation, with the tail anchored on a dot. A negative length reverses the body direction while keeping the rotation convention.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['vector', 'length', 'rotate', 'anchor'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
