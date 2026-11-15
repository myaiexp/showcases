// postprocessing example: LensDistortionEffect radial distortion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lens distortion',
  summary:
    'LensDistortionEffect bends the picture with two radial coefficients. Positive values pull the edges inward (barrel, a fisheye look), negative values push them outward (pincushion); x is the squared-radius term and y scales the same warp on the second axis. The straight columns of the corridor show the bend.',
  section: 'Other effects',
  tags: ['LensDistortionEffect', 'distortion', 'Vector2'],
  docs: ['repo/README.md', 'repo/src/effects/LensDistortionEffect.js', 'repo/src/effects/glsl/lens-distortion.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
