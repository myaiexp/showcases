// postprocessing example: LensDistortionEffect focalLength on each axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lens distortion: focal length',
  summary:
    'focalLength scales the sampled image per axis. Values above 1 sample a wider area, shrinking the picture (and showing black borders); values below 1 zoom in. Different x and y values stretch the picture along one axis.',
  section: 'Other effects',
  tags: ['LensDistortionEffect', 'focalLength', 'distortion'],
  docs: ['repo/README.md', 'repo/src/effects/LensDistortionEffect.js', 'repo/src/effects/glsl/lens-distortion.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
