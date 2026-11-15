// postprocessing example: the EffectPass merging effects, measured in draw calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Merging effects in one pass',
  summary:
    'The README\'s performance note: an EffectPass merges any combination of effects into one compound shader. The same six effects run as one EffectPass, then as six EffectPasses in a row; the overlay counts the draw calls of each frame, scene included, so the five extra fullscreen draws of the chained version show up.',
  section: 'Usage',
  tags: ['EffectPass', 'BrightnessContrastEffect', 'HueSaturationEffect', 'SepiaEffect', 'ScanlineEffect', 'NoiseEffect', 'VignetteEffect', 'renderer.info'],
  docs: [
    'repo/README.md',
    'repo/manual/content/_index.en.md',
    'repo/src/passes/EffectPass.js',
    'repo/src/effects/BrightnessContrastEffect.js',
    'repo/src/effects/HueSaturationEffect.js',
    'repo/src/effects/SepiaEffect.js',
    'repo/src/effects/ScanlineEffect.js',
    'repo/src/effects/NoiseEffect.js',
    'repo/src/effects/VignetteEffect.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
