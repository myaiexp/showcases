// PlayCanvas example: Metalness and gloss maps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Metalness and gloss maps",
  summary:
    "A binary metalness map of metal and non-metal squares plus a mottled gloss map, on a sphere and a box. The full view toggles each map, glossInvert (for roughness data) and the gloss multiplier.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "metalnessMap", "glossMap", "glossInvert", "gloss"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/index.md", "repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
