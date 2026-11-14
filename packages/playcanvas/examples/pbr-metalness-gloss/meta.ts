// PlayCanvas example: Metalness and gloss grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Metalness and gloss grid",
  summary:
    "A 6 by 3 grid of spheres under a generated HDR sky: columns step gloss from rough to mirror-smooth, rows are metalness 0, a slider value and 1. The full view picks the diffuse from the docs' recorded gold, silver and copper values.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "useMetalness", "metalness", "gloss", "diffuse"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/index.md", "repo/docs/user-manual/graphics/physical-rendering/physical-materials.md", "repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
