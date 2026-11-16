// aframe example: geometry: box size and segments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: box size and segments",
  summary: "A box with width, height and depth sliders and segmentsWidth, segmentsHeight and segmentsDepth, drawn as a wireframe so the extra faces show. Changing a property updates the geometry component with setAttribute.",
  section: 'Components',
  tags: ["geometry", "box", "width", "height", "depth", "segmentsWidth", "segmentsHeight", "segmentsDepth", "wireframe", "setAttribute"],
  docs: ["repo/docs/components/geometry.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
