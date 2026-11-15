// postprocessing example: NoiseTexture used as the glitch perturbation map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: NoiseTexture',
  summary:
    'NoiseTexture is a DataTexture of random values, and it is what GlitchEffect builds for itself when no perturbationMap is given. Here five of different sizes are swapped in: a 2x2 map pushes the picture in a few big directions, a 256x256 one in fine grain. The glitch needs the RGBA format for its green channel.',
  section: 'Glitch',
  tags: ['NoiseTexture', 'GlitchEffect', 'perturbationMap', 'RGBAFormat'],
  docs: ['repo/README.md', 'repo/src/textures/NoiseTexture.js', 'repo/src/effects/GlitchEffect.js', 'repo/src/effects/glsl/glitch.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
