// galacean example: PBR anisotropy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR anisotropy",
  summary: "Brushed-metal spheres with anisotropy from 0 to 1: the round highlight stretches into a streak along the surface tangent. The full view has a roughness slider.",
  section: "Material",
  tags: ['PBRMaterial','anisotropy'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
