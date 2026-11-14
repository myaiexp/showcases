// deck-gl example: FlyToInterpolator speed, curve and maxDuration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FlyToInterpolator speed, curve and maxDuration',
  summary:
    "FlyToInterpolator with transitionDuration 'auto': sliders for speed, curve and screenSpeed change the flight, and a maxDuration below the computed duration turns the flight into an instant jump.",
  section: 'Animations and transitions',
  tags: ['FlyToInterpolator', 'speed', 'curve', 'screenSpeed', 'maxDuration', 'transitionDuration'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',
    'repo/docs/api-reference/core/fly-to-interpolator.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
