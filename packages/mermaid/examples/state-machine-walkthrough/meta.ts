// mermaid example: State machine walkthrough with a highlighted current state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'State machine walkthrough with a highlighted current state',
  summary:
    'A timer walks a traffic-light state machine; each step re-renders the same definition with a classDef moved onto the current state.',
  section: 'State Diagram',
  tags: ['state', 'classDef', 'animation', 're-render'],
  docs: ['repo/packages/mermaid/src/docs/syntax/stateDiagram.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
