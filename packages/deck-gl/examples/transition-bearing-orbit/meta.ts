// deck-gl example: Bearing orbit with LinearInterpolator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bearing orbit with LinearInterpolator',
  summary:
    "A LinearInterpolator limited to transitionProps: ['bearing'] turns the camera around a skyline, and onTransitionEnd starts the next leg, so the orbit never stops until you drag.",
  section: 'Animations and transitions',
  tags: ['LinearInterpolator', 'transitionProps', 'bearing', 'onTransitionEnd', 'transitionDuration'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',
    'repo/docs/api-reference/core/linear-interpolator.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
