// babylon-js example: animation events on frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation events on frames',
  summary:
    'A sphere loops around a square path; an AnimationEvent on each corner\'s key frame lights that corner\'s pad, and one event created with onlyOnce set to true recolors the sphere on the first lap only.',
  section: 'Animation',
  tags: ['AnimationEvent', 'animation.addEvent', 'onlyOnce', 'Animation', 'ANIMATIONLOOPMODE_CYCLE'],
  docs: [
    'repo/content/features/featuresDeepDive/animation/advanced_animations.md',
    'repo/content/features/featuresDeepDive/animation/animation_method.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
