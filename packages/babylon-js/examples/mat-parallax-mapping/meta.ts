// babylon-js example: Normal and parallax mapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normal and parallax mapping',
  summary:
    'A brick wall whose colour map and normal map are generated in code, the normal map carrying the brick height in its alpha channel. The StandardMaterial switches between flat, bumpTexture normal mapping, useParallax and useParallaxOcclusion under a moving point light; parallaxScaleBias sets the depth.',
  section: 'Materials',
  tags: ['bumpTexture', 'useParallax', 'useParallaxOcclusion', 'parallaxScaleBias'],
  docs: [
    'repo/content/features/featuresDeepDive/materials/using/normalMaps.md',
    'repo/content/features/featuresDeepDive/materials/using/parallaxMapping.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
