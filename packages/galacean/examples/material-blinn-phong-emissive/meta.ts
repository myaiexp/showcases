// galacean example: Blinn-Phong emissive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blinn-Phong emissive",
  summary: "Blinn-Phong spheres with emissiveColor and an emissiveTexture of glowing lines: they stay visible with no light in the scene, and the card pulses the colour.",
  section: "Material",
  tags: ['BlinnPhongMaterial','emissiveColor','emissiveTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/blinnPhong.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
