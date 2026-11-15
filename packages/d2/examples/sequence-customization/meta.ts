// d2 example: Styling messages and actors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Styling messages and actors',
  summary:
    'Messages and actors take the same styles as other objects: `style.stroke-dash` on the return messages makes them dashed, and `shape: person` changes the actor\'s outline.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'style', 'stroke-dash'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-4.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
