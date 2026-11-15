// galacean example: PBR index of refraction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR index of refraction",
  summary: "Glossy dielectric spheres with ior from 1.0 to 2.6: the specular highlight and rim reflection strengthen as the index of refraction rises. The full view has a slider that moves them all.",
  section: "Material",
  tags: ['PBRMaterial','ior'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
