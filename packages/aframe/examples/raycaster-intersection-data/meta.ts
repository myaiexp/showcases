// aframe example: raycaster: getIntersection(el) each tick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "raycaster: getIntersection(el) each tick",
  summary: "A box listens for raycaster-intersected to learn which raycaster is on it, then asks that raycaster's getIntersection(el) every tick, as the docs' raycaster-listen does, and moves a small marker sphere to the hit point. The read-out shows distance, point, faceIndex and uv.",
  section: 'Components',
  tags: ["raycaster", "getIntersection", "raycaster-intersected", "raycaster-intersected-cleared", "intersection", "point", "distance", "uv", "faceIndex"],
  docs: ["repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
