// fabric example: Selection: perPixelTargetFind and tolerance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: perPixelTargetFind and tolerance',
  summary:
    'With perPixelTargetFind the canvas picks an object only where it is actually painted, so the hole of a ring or the empty corner of a triangle box passes the pointer through. targetFindTolerance widens the hit area in pixels.',
  section: 'Selection',
  tags: ['perPixelTargetFind', 'targetFindTolerance', 'setTargetFindTolerance', 'mouse:move'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md', 'repo/src/content/docs/api/interfaces/CanvasOptions.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
