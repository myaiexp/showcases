// playcanvas example: Animating component properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animating component properties',
  summary:
    "Curves can drive component properties as well as transforms. Two clips built in code animate two spot lights' colour, intensity and rotation: a steady green sweep and a fast red flash with step keys. The anim component cross-fades from one to the other with layer.transition, or cuts with play.",
  section: 'Animation',
  tags: ['AnimCurve', 'AnimTrack', 'AnimData', 'LightComponent', 'color', 'intensity', 'transition', 'AnimComponentLayer'],
  docs: [
    'repo/docs/user-manual/animation/clips.md',
    'repo/docs/user-manual/animation/playing-animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
