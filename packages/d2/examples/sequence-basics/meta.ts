// d2 example: Sequence diagram basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence diagram basics',
  summary:
    'Setting `shape: sequence_diagram` on an object makes its connections messages in time order, top to bottom, with each endpoint an actor and a lifeline below it. There is no new syntax beyond ordinary connections.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'actor'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
