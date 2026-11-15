// galacean example: PBR specular intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR specular intensity",
  summary: "A glossy dielectric row with specularIntensity from 0 to 1: the highlights fade out entirely at 0. A slider moves the values together.",
  section: "Material",
  tags: ['PBRMaterial','specularIntensity'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
