// galacean example: PBR transparent blend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR transparent blend",
  summary: "With isTransparent on, the alpha of baseColor blends the sphere with whatever is behind it: alpha runs from 0.1 to 1 along the row, over a patterned wall.",
  section: "Material",
  tags: ['PBRMaterial','isTransparent','baseColor'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
