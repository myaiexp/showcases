// aframe example: raycaster: showLine and raycaster-intersection events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "raycaster: showLine and raycaster-intersection events",
  summary: "A raycaster on a turning entity draws its ray with showLine and tests only the .collidable boxes. The line stops at whatever it hits, and the raycasting entity emits raycaster-intersection with the newly hit els and raycaster-intersection-cleared with the clearedEls, which the read-out reports.",
  section: 'Components',
  tags: ["raycaster", "showLine", "objects", "raycaster-intersection", "raycaster-intersection-cleared", "els", "clearedEls", "lineColor"],
  docs: ["repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
