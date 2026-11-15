// postprocessing example: a NoiseTexture used as a dissolve map in a custom effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NoiseTexture: dissolve map',
  summary:
    'A 128 x 128 Red NoiseTexture is passed to a custom effect as a sampler2D uniform and tiled over the frame with RepeatWrapping. Pixels whose noise value is below `progress` disappear, with a glowing ember edge on the threshold. The slider sets the size in pixels of one noise cell.',
  section: 'Utilities',
  tags: ['NoiseTexture', 'Effect', 'uniforms', 'sampler2D', 'resolution', 'RepeatWrapping'],
  docs: ['repo/README.md', 'repo/src/textures/NoiseTexture.js', 'repo/src/effects/Effect.js', 'repo/src/materials/glsl/effect.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
