// galacean example: PBR sheen textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR sheen textures",
  summary: "Two velvet spheres: one colours its sheen by band with sheenColorTexture, the other ramps sheenRoughnessTexture so the rim sharpens from one side to the other.",
  section: "Material",
  tags: ['PBRMaterial','sheenColorTexture','sheenRoughnessTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
