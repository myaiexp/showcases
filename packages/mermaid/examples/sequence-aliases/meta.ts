// mermaid example: Sequence participant aliases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence participant aliases',
  summary:
    'External as aliases, inline alias fields in the participant config, both together (the external one wins), and aliases on typed participants.',
  section: 'Sequence Diagram',
  tags: ['sequence', 'alias', 'participant'],
  docs: ['repo/packages/mermaid/src/docs/syntax/sequenceDiagram.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
