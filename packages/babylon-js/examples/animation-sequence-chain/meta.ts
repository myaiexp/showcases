// babylon-js example: chained animation sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chained animation sequence',
  summary:
    'A short cartoon built from consecutive clips: the camera approaches a doorway, the door swings open, the camera enters and turns, two spot lights fade up and the door closes. Each clip is started by the previous clip\'s beginDirectAnimation end callback, and the last one restarts the first.',
  section: 'Animation',
  tags: ['scene.beginDirectAnimation', 'Animation', 'ANIMATIONLOOPMODE_CONSTANT', 'TransformNode', 'SpotLight'],
  docs: [
    'repo/content/features/featuresDeepDive/animation/sequenceAnimations.md',
    'repo/content/features/featuresDeepDive/animation/combineAnimations.md',
    'repo/content/features/featuresDeepDive/animation/animation_method.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
