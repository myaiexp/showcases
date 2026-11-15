// galacean example: PBR specular colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR specular colour",
  summary: "Five glossy spheres with the same dark base and different specularColor values: the highlight takes the colour of the F0 reflection. A colour picker sets one for the whole row.",
  section: "Material",
  tags: ['PBRMaterial','specularColor'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
