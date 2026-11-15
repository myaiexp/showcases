// postprocessing example: LensDistortionEffect principalPoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lens distortion: principal point',
  summary:
    'principalPoint is a shift of the lens centre in normalised coordinates (-1 to 1). Moving it slides the whole warped image sideways or up and down and exposes black borders on the far side. The fixed distortion keeps the barrel bend visible.',
  section: 'Other effects',
  tags: ['LensDistortionEffect', 'principalPoint', 'distortion'],
  docs: ['repo/README.md', 'repo/src/effects/LensDistortionEffect.js', 'repo/src/effects/glsl/lens-distortion.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
