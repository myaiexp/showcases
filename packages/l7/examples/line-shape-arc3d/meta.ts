// l7 example: shape('arc3d'): arcs standing up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('arc3d'): arcs standing up",
  summary:
    "shape('arc3d') lifts each arc off the map as a vertical arc, so it needs a pitched camera to read. The card orbits the camera.",
  section: "Line Layer",
  tags: ["shape","shape('arc3d')","LineLayer"],
  docs: ["repo/site/docs/api/line_layer/shape.en.md","repo/site/docs/api/line_layer/linelayer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
