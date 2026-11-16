// fabric example: Free drawing: pattern brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: pattern brush',
  summary:
    'PatternBrush draws with a repeating tile instead of a color. Paint any canvas element and assign it to brush.source; the finished stroke keeps it as a Pattern stroke.',
  section: 'Free drawing',
  tags: ['PatternBrush', 'source', 'getPattern', 'Pattern', 'freeDrawingBrush', 'width'],
  docs: [
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/PatternBrush.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
