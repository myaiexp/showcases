// postprocessing example: a custom effect overriding setSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: setSize',
  summary:
    'A mosaic effect overrides `setSize(width, height)`, which the EffectPass forwards from the composer, and turns the frame buffer size into a tile count so tiles stay the same size in pixels. The mosaic itself is a `mainUv` snap. Resize the canvas with the slider and watch the readout.',
  section: 'Custom effects',
  tags: ['Effect', 'setSize', 'mainUv', 'uniforms', 'EffectComposer'],
  docs: ['repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
