// galacean example: PBR clear coat normal texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR clear coat normal texture",
  summary: "Three lacquered spheres: a bumpy base whose coat reuses its normal map, a smooth base with its own bumpy coat normal, and a bumpy base under a coat with a different ridge normal map.",
  section: "Material",
  tags: ['PBRMaterial','clearCoatNormalTexture','normalTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
