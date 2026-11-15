// zephyr3d example: Keyframe interpolation modes: linear, step and spline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframe interpolation modes: linear, step and spline',
  summary:
    'Three spheres follow the same five translation keyframes with different interpolation modes: \'linear\', \'step\', and \'cubicspline-natural\', which smooths the path through the same keys. Small cubes mark the keyframes.',
  section: 'Animation',
  tags: ['NodeTranslationTrack', 'linear', 'step', 'cubicspline-natural', 'InterpolationMode', 'keyframes'],
  docs: ['repo/apps/doc/web/en/animation-keyframe.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
