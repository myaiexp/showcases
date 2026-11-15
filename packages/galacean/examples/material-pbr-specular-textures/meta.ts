// galacean example: PBR specular textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR specular textures",
  summary: "Three spheres: plain, with a specular-intensity texture (alpha stripes that mute the highlight in bands) and with a specular-colour texture (RGB bands that tint it).",
  section: "Material",
  tags: ['PBRMaterial','specularIntensityTexture','specularColorTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
