// d2 example: Shared scope in sequence diagrams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shared scope in sequence diagrams',
  summary:
    'Everywhere else in D2 the same key in different containers names different shapes. Under `shape: sequence_diagram`, `alice` and `bob` in nested groups still refer to the same two actors.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'scope', 'group'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-scope.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
