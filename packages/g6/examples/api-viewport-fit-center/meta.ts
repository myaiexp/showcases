// g6 example: Viewport: fitCenter moves without scaling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: fitCenter moves without scaling',
  summary: 'graph.fitCenter(animation) pans the graph to the middle of the viewport and keeps the zoom. Drag the graph off to one side, then press fitCenter.',
  section: 'API',
  tags: ['fitCenter', 'ViewportAnimationEffectTiming'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
