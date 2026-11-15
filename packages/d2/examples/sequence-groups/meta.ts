// d2 example: Groups (fragments)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups (fragments)',
  summary:
    'A group labels a subset of messages with a box. The actors referenced inside must be declared at the top level before the groups, as `alice` and `bob` are here.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'group'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-group.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
