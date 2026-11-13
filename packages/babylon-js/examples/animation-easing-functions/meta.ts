// babylon-js example: easing functions on keyframe animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Easing functions on keyframe animations',
  summary:
    'Ten spheres run the same two-key Animation with a different easing function each: Circle, Back, Bounce, Cubic, Elastic, Exponential, Power, Quadratic, Sine and a BezierCurveEase. Switch the shared EasingMode between ease in, ease out and ease in-out.',
  section: 'Animation',
  tags: ['Animation', 'setKeys', 'EasingFunction', 'setEasingMode', 'BezierCurveEase', 'scene.beginAnimation'],
  docs: [
    'repo/content/features/featuresDeepDive/animation/animation_method.md',
    'repo/content/features/featuresDeepDive/animation/advanced_animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
