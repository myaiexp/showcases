// aframe example: material: displacementMap on a segmented plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: displacementMap on a segmented plane",
  summary: "A grayscale noise image displaces the vertices of a finely segmented plane. displacementScale sets the height, displacementBias the zero point and displacementTextureOffset slides the map so the terrain drifts. Displacement needs vertices to move, so the plane has many segments.",
  section: 'Components',
  tags: ["material", "displacementMap", "displacementScale", "displacementBias", "displacementTextureOffset", "segmentsWidth", "segmentsHeight"],
  docs: ["repo/docs/components/material.md", "repo/docs/components/geometry.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
