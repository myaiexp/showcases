// galacean example: PBR tiling and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR tiling and offset",
  summary: "tilingOffset is a Vector4: x and y repeat the base texture, z and w slide it. Four quads show tiling 1, 2, 3 and 4 while the card scrolls the offset.",
  section: "Material",
  tags: ['PBRMaterial','tilingOffset','baseTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
