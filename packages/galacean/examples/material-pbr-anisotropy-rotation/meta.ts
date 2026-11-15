// galacean example: PBR anisotropy rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR anisotropy rotation",
  summary: "A brushed-metal sphere at full anisotropy whose anisotropyRotation turns the streak direction around the tangent frame, in degrees. The card turns it continuously; a slider drives it in the full view.",
  section: "Material",
  tags: ['PBRMaterial','anisotropyRotation'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
