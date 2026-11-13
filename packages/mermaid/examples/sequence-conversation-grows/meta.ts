// mermaid example: Sequence diagram that grows message by message
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence diagram that grows message by message',
  summary:
    'A timer appends one line at a time to the definition and re-renders it, so a checkout conversation unfolds on screen, then restarts.',
  section: 'Sequence Diagram',
  tags: ['sequence', 'animation', 're-render', 'messages'],
  docs: ['repo/packages/mermaid/src/docs/syntax/sequenceDiagram.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
