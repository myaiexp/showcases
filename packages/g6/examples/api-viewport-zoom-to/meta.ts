// g6 example: Viewport: zoomTo with an origin and animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: zoomTo with an origin and animation',
  summary: 'graph.zoomTo(zoom, animation, origin) sets an absolute zoom. The origin is the viewport point that stays fixed: none, the viewport center or the top-left corner.',
  section: 'API',
  tags: ['zoomTo', 'getCanvasCenter', 'ViewportAnimationEffectTiming', 'Point'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
