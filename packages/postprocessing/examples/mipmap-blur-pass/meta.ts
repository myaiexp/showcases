// postprocessing example: MipmapBlurPass on its own
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MipmapBlurPass by itself',
  summary:
    'A MipmapBlurPass used without a bloom: it downsamples the frame through its levels and upsamples with a radius, and leaves the result in its texture. A TextureEffect then paints that texture over the scene.',
  section: 'Blur',
  tags: ['MipmapBlurPass', 'levels', 'radius', 'texture', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/passes/MipmapBlurPass.js', 'repo/src/effects/TextureEffect.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
