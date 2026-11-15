// postprocessing example: NoiseEffect with and without premultiply
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noise: premultiply',
  summary:
    'NoiseEffect draws animated static. With premultiply off the noise is plain grey and the default SCREEN blend lifts the whole picture, dark parts included. With premultiply on the noise is first multiplied with the input colours, so it becomes grain that follows the image.',
  section: 'Glitch',
  tags: ['NoiseEffect', 'premultiply', 'BlendFunction.SCREEN'],
  docs: ['repo/README.md', 'repo/src/effects/NoiseEffect.js', 'repo/src/effects/glsl/noise.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
