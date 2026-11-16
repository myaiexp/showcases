// fabric example: Utilities: isTransparent pixel test
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: isTransparent pixel test',
  summary:
    'util.isTransparent(ctx, x, y, tolerance) reads pixels from the canvas context: the probe turns green over a painted pixel and red over empty paper, and the tolerance widens the square it checks. This is the test behind perPixelTargetFind.',
  section: 'Utilities',
  tags: ['util.isTransparent', 'getContext', 'getRetinaScaling', 'mouse:move'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/isTransparent.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
