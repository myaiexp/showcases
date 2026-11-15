// aframe example: geometry: plane, circle, ring and triangle need side: double
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: plane, circle, ring and triangle need side: double",
  summary: "Flat geometries have one face. Each shape here turns about the Y axis, with its front side only on the top row and side: double on the bottom row, so the single-sided ones vanish for half of every turn. The triangle's vertexA, vertexB and vertexC are set explicitly.",
  section: 'Components',
  tags: ["geometry", "plane", "circle", "ring", "triangle", "vertexA", "vertexB", "vertexC", "side", "double"],
  docs: ["repo/docs/components/geometry.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
