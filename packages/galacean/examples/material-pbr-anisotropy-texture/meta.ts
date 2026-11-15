// galacean example: PBR anisotropy texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR anisotropy texture",
  summary: "Red and green of the anisotropy texture carry a swirling direction and blue the strength, so one sphere shows streaks pointing every which way. The left sphere is the same material without the texture.",
  section: "Material",
  tags: ['PBRMaterial','anisotropyTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
