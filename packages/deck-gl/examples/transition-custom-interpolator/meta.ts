// deck-gl example: Custom TransitionInterpolator subclass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom TransitionInterpolator subclass',
  summary:
    'A TransitionInterpolator subclass that implements getDuration, initializeProps and interpolateProps and flies the camera across the antimeridian by the short way, compared against LinearInterpolator.',
  section: 'Animations and transitions',
  tags: ['TransitionInterpolator', 'getDuration', 'initializeProps', 'interpolateProps', 'transitionDuration'],
  docs: [
    'repo/docs/api-reference/core/transition-interpolator.md',
    'repo/docs/developer-guide/animations-and-transitions.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
