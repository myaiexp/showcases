// d2 example: Spans (activation boxes)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spans (activation boxes)',
  summary:
    'A key like `alice.t1` is an object nested on the actor, drawn as a bar along the lifeline. Messages from and to it start and end that span; reversing the arrow (`<-`) returns the message.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'span'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-3.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
