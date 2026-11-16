// fabric example: Free drawing: pattern brush getPatternSrc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: pattern brush getPatternSrc',
  summary:
    'PatternBrush asks getPatternSrc() for its tile at the start of each stroke. Overriding it on the instance paints a custom tile that follows brush.color and a gap you choose.',
  section: 'Free drawing',
  tags: ['PatternBrush', 'getPatternSrc', 'getPattern', 'color', 'freeDrawingBrush'],
  docs: [
    'repo/src/content/docs/api/classes/PatternBrush.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/docs/core-concepts.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
