// deck-gl example: LinearInterpolator around a screen point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LinearInterpolator around a screen point',
  summary:
    'LinearInterpolator with around and makeViewport zooms and rotates the map while the location under a chosen pixel stays put. Click the map to move the anchor.',
  section: 'Animations and transitions',
  tags: ['LinearInterpolator', 'around', 'makeViewport', 'WebMercatorViewport'],
  docs: [
    'repo/docs/api-reference/core/linear-interpolator.md',
    'repo/docs/developer-guide/animations-and-transitions.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
