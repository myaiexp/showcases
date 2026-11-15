// galacean example: PBR clear coat roughness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR clear coat roughness",
  summary: "Full-strength clear coat with clearCoatRoughness from 0 to 1: the lacquer goes from a mirror finish to a satin one while the base stays the same.",
  section: "Material",
  tags: ['PBRMaterial','clearCoat','clearCoatRoughness'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
