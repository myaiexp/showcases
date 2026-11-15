// postprocessing example: the composer following renderer.outputColorSpace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Output colour space',
  summary:
    'The README asks for a linear workflow: set WebGLRenderer.outputColorSpace to SRGBColorSpace and postprocessing follows suit, encoding colours on the way to the screen. Switch to LinearSRGBColorSpace and the image comes out dark and harsh. The composer reads the setting when it receives the renderer (its 8-bit buffers become sRGB textures), so each switch builds a new one.',
  section: 'Usage',
  tags: ['outputColorSpace', 'SRGBColorSpace', 'LinearSRGBColorSpace', 'EffectComposer', 'VignetteEffect'],
  docs: ['repo/README.md', 'repo/src/core/EffectComposer.js', 'repo/src/effects/VignetteEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
