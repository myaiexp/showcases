// postprocessing example: SMAA edges and weights textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA edges and weights textures',
  summary:
    'An SMAAEffect works in three steps: find edges, turn them into blend weights, then blend. Its edgesTexture and weightsTexture are plain textures, so a TextureEffect in a second EffectPass can paint either one over the frame.',
  section: 'Antialiasing',
  tags: ['SMAAEffect', 'edgesTexture', 'weightsTexture', 'TextureEffect', 'EffectPass'],
  docs: ['repo/src/effects/SMAAEffect.js', 'repo/src/effects/TextureEffect.js', 'repo/src/passes/EffectPass.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
