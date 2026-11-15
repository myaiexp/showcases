// postprocessing example: bloom luminance threshold and smoothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom threshold and smoothing',
  summary:
    'A BloomEffect only lets pixels above its luminance threshold glow. Lower the threshold and the lit floor and ball start to bloom with the neon; raise the smoothing and the cut-off turns into a soft ramp. Both live on the effect\'s luminanceMaterial.',
  section: 'Bloom',
  tags: ['BloomEffect', 'luminanceThreshold', 'luminanceSmoothing', 'luminanceMaterial', 'threshold', 'smoothing'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/materials/LuminanceMaterial.js', 'repo/src/passes/LuminancePass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
