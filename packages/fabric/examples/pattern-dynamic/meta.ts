// fabric example: Patterns and shadows: A pattern from a changing canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Patterns and shadows: A pattern from a changing canvas',
  summary:
    'The pattern source is a <canvas> repainted every frame; marking the uncached objects dirty and rendering makes the fill animate.',
  section: 'Patterns and shadows',
  tags: ['Pattern', 'source', 'dirty', 'objectCaching'],
  docs: ['repo/src/content/docs/api/classes/Pattern.md', 'repo/src/content/docs/api/classes/Rect.md', 'repo/src/content/docs/api/classes/Triangle.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
