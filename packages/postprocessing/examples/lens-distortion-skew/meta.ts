// postprocessing example: LensDistortionEffect skew
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lens distortion: skew',
  summary:
    'skew adds a shear to the lens matrix, leaning the picture sideways: the vertical columns tilt while the horizon stays level. With distortion at zero the effect is a pure shear.',
  section: 'Other effects',
  tags: ['LensDistortionEffect', 'skew'],
  docs: ['repo/README.md', 'repo/src/effects/LensDistortionEffect.js', 'repo/src/effects/glsl/lens-distortion.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
