// galacean example: Blinn-Phong specular colour and texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blinn-Phong specular colour and texture",
  summary: "Three spheres: a white specular, a gold specularColor, and a specularTexture of stripes that multiplies the specular colour so highlights show only in bands.",
  section: "Material",
  tags: ['BlinnPhongMaterial','specularColor','specularTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/blinnPhong.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
