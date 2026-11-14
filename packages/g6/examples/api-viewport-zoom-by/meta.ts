// g6 example: Viewport: zoomBy a ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: zoomBy a ratio',
  summary: 'graph.zoomBy(ratio, animation, origin) multiplies the current zoom. Each press compounds on the last; the duration slider sets the animation.',
  section: 'API',
  tags: ['zoomBy', 'getZoom', 'ViewportAnimationEffectTiming'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
