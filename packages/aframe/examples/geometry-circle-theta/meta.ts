// aframe example: geometry: thetaStart and thetaLength make arcs and partial circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: thetaStart and thetaLength make arcs and partial circles",
  summary: "A flat circle with thetaStart and thetaLength in degrees: the docs' ( and ) arcs, a Pac-Man wedge, and a ring whose thetaLength is animated like a fuse cursor. Flat shapes need side: double on the material to show from behind.",
  section: 'Components',
  tags: ["geometry", "circle", "thetaStart", "thetaLength", "segments", "ring", "animation", "side: double"],
  docs: ["repo/docs/components/geometry.md", "repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
