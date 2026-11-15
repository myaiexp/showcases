// galacean example: PBR clear coat textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR clear coat textures",
  summary: "Two spheres with a full-strength clear coat: one masks it with clearCoatTexture stripes so lacquer appears only in bands, the other ramps clearCoatRoughnessTexture so it blurs from one side to the other.",
  section: "Material",
  tags: ['PBRMaterial','clearCoatTexture','clearCoatRoughnessTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
