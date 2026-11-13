// mermaid example: Collapsible subgraph toggle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collapsible subgraph toggle',
  summary:
    'Attach `@{ view: collapsed }` to a subgraph id and it becomes one node; a checkbox switches the metadata on and off and redraws the diagram.',
  section: 'Flowchart',
  tags: ['flowchart', 'subgraph', 'collapsed', 'view'],
  docs: ['repo/packages/mermaid/src/docs/syntax/flowchart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
