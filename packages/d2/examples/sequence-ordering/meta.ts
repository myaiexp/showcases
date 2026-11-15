// d2 example: Actor order follows the source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Actor order follows the source',
  summary:
    'D2 normally has no notion of order, but a sequence diagram draws messages and actors in the order written. Declaring `a; b; c; d` up front fixes the left-to-right order, whatever order the connections come in.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'order', 'semicolon'],
  docs: ['repo/docs/tour/sequence-diagrams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
