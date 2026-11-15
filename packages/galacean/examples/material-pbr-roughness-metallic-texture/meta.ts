// galacean example: PBR roughness-metallic texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR roughness-metallic texture",
  summary: "One texture holds roughness in its green channel and metallic in blue, banded across the sphere; the metallic and roughness values multiply it. Four spheres differ only in those multipliers.",
  section: "Material",
  tags: ['PBRMaterial','roughnessMetallicTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
