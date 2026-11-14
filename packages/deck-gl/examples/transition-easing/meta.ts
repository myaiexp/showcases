// deck-gl example: Camera transitionEasing curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera transitionEasing curves',
  summary:
    'transitionEasing shapes a camera move: pick linear, ease-in-cubic, ease-out-cubic, ease-in-out-sine or a bounce, and a plot shows the curve with a dot riding it as the view state changes.',
  section: 'Animations and transitions',
  tags: ['transitionEasing', 'transitionDuration', 'onViewStateChange', 'LinearInterpolator'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',
    'repo/docs/api-reference/core/linear-interpolator.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
