// d2 example: Notes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Notes',
  summary:
    'A string key such as `bob."In the eyes of my dog, I\'m a man."` declares an object on the actor with nothing connecting to it, and D2 draws it as a note beside the lifeline. Notes can sit inside groups too.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'note'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-note.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
