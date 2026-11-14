// g6 example: Viewport: translateBy an offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: translateBy an offset',
  summary: 'graph.translateBy([dx, dy], animation) pans relative to where the canvas is now, so each press adds to the last.',
  section: 'API',
  tags: ['translateBy', 'getPosition', 'ViewportAnimationEffectTiming'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
