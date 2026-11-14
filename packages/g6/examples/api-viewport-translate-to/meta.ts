// g6 example: Viewport: translateTo a position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: translateTo a position',
  summary: 'graph.translateTo([x, y], animation) moves the canvas origin to an absolute viewport position, so repeating the same call changes nothing.',
  section: 'API',
  tags: ['translateTo', 'getPosition', 'ViewportAnimationEffectTiming'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
