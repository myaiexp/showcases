// postprocessing example: bilateral box blur
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bilateral box blur',
  summary:
    'With bilateral on, a BoxBlurPass reads the depth texture and refuses to average across depth jumps, so the blur smooths surfaces while object silhouettes stay crisp. worldDistanceThreshold sets how large a jump counts.',
  section: 'Blur',
  tags: ['BoxBlurPass', 'bilateral', 'worldDistanceThreshold', 'blurMaterial', 'needsDepthTexture'],
  docs: ['repo/src/passes/BoxBlurPass.js', 'repo/src/materials/BoxBlurMaterial.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
