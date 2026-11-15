// postprocessing example: EffectPass dithering against banding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dithering',
  summary:
    'The README warns that 8-bit sRGB buffers show banding in dark scenes. A dim spotlight and a vignette make long, dark gradients; turning on the EffectPass\'s dithering flag adds fine noise to its output so the steps between shades blur into a smooth ramp.',
  section: 'Usage',
  tags: ['EffectPass', 'dithering', 'VignetteEffect', 'UnsignedByteType'],
  docs: ['repo/README.md', 'repo/src/passes/EffectPass.js', 'repo/src/materials/EffectMaterial.js', 'repo/src/effects/VignetteEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
