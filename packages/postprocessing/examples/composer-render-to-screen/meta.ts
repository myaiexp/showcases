// postprocessing example: autoRenderToScreen and renderToScreen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EffectComposer: autoRenderToScreen',
  summary:
    'With autoRenderToScreen switched off, the example sets renderToScreen itself. Putting it on an earlier pass shows the picture as it stood at that stage of the chain, so the sepia, pixelation and vignette passes can be inspected one at a time.',
  section: 'Passes',
  tags: ['EffectComposer', 'autoRenderToScreen', 'renderToScreen', 'Pass', 'EffectPass'],
  docs: ['repo/src/effects/VignetteEffect.js', 'repo/src/effects/SepiaEffect.js', 'repo/src/effects/PixelationEffect.js', 'repo/src/core/EffectComposer.js', 'repo/src/passes/Pass.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
