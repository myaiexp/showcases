// vchart example: Enter and exit with built-in types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Enter and exit with built-in types",
  summary:
    "Per-mark animationEnter and animationExit use built-in types instead of the default: new bars scaleIn along y while removed bars moveOut or fadeOut. A select swaps the exit type.",
  section: 'Animation',
  tags: ['animationEnter', 'animationExit', 'scaleIn', 'moveOut', 'fadeOut', 'type'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
    'repo/docs/assets/option/en/animate/animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
