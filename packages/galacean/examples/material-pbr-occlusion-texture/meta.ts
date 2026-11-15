// galacean example: PBR occlusion texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR occlusion texture",
  summary: "An occlusion texture of dark crevices darkens the ambient light on four spheres at intensity 0, 0.5, 1 and 2, adding contact shadow detail the geometry lacks.",
  section: "Material",
  tags: ['PBRMaterial','occlusionTexture','occlusionTextureIntensity'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
