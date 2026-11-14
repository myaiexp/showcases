// PlayCanvas example: Anisotropic specular
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Anisotropic specular",
  summary:
    "Brushed-metal spheres and a torus under GGX specular: intensity 0 gives the round highlight, intensity near 1 stretches it. The full view rotates the stretch direction and changes gloss.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "enableGGXSpecular", "anisotropyIntensity", "anisotropyRotation"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
