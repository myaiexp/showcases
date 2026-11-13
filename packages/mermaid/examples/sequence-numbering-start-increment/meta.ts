// mermaid example: Sequence numbering with start and increment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence numbering with start and increment',
  summary:
    'autonumber takes a start and an increment (decimals allowed), can restart mid-diagram, and showSequenceNumbers turns numbering on from frontmatter config.',
  section: 'Sequence Diagram',
  tags: ['sequence', 'autonumber', 'showSequenceNumbers'],
  docs: ['repo/packages/mermaid/src/docs/syntax/sequenceDiagram.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
