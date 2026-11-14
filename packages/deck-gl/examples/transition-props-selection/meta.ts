// deck-gl example: Choosing which view-state props animate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choosing which view-state props animate',
  summary:
    'LinearInterpolator takes a list of transitionProps; only those props are interpolated between two camera states. Switch between zoom only, position only, bearing and pitch only, or the default set.',
  section: 'Animations and transitions',
  tags: ['LinearInterpolator', 'transitionProps', 'transitionDuration'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',
    'repo/docs/api-reference/core/linear-interpolator.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
