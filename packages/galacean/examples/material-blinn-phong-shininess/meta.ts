// galacean example: Blinn-Phong shininess
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blinn-Phong shininess",
  summary: "Five Blinn-Phong spheres with shininess from 2 to 200: the specular highlight shrinks from a wide haze to a tight point. The full view tints the specular colour.",
  section: "Material",
  tags: ['BlinnPhongMaterial','shininess','specularColor'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/blinnPhong.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
