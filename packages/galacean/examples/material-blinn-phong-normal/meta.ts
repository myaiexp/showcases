// galacean example: Blinn-Phong normal map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blinn-Phong normal map",
  summary: "A bump normal map on Blinn-Phong spheres with normalIntensity 0, 0.5, 1 and 2: surface detail appears without extra geometry and grows with the intensity.",
  section: "Material",
  tags: ['BlinnPhongMaterial','normalTexture','normalIntensity'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/blinnPhong.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
