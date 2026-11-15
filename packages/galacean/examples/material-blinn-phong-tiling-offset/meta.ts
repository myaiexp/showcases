// galacean example: Blinn-Phong tiling and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blinn-Phong tiling and offset",
  summary: "A lit Blinn-Phong floor tile whose bricks scale and slide as tilingOffset changes: x and y are the repeat counts, z and w the offset.",
  section: "Material",
  tags: ['BlinnPhongMaterial','tilingOffset','baseTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/blinnPhong.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
