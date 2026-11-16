// aframe example: line: start, end, colour and several lines on one entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "line: start, end, colour and several lines on one entity",
  summary: "The line component draws a THREE.Line between start and end. An entity can hold several lines by name-spacing: line, line__2, line__sweep. Each has its own colour and opacity, and one animates its end point. The read-out shows that the meshes sit in object3DMap as line and line__<id>.",
  section: 'Components',
  tags: ["line", "start", "end", "color", "opacity", "visible", "line__<id>", "object3DMap", "getObject3D"],
  docs: ["repo/docs/components/line.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
