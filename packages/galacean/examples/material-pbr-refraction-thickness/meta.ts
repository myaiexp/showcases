// galacean example: PBR refraction thickness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR refraction thickness",
  summary: "With transmission on, thickness above 0 turns on refraction: the wall seen through the spheres bends more as thickness grows from 0 to 2.",
  section: "Material",
  tags: ['PBRMaterial','thickness','transmission','refractionMode'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
