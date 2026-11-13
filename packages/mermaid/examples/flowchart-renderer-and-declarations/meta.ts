// mermaid example: Flowchart renderer choice and relaxed declarations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flowchart renderer choice and relaxed declarations',
  summary:
    'The v12 layout key replaces defaultRenderer (ELK by default, dagre on request), the older flowchart-elk keyword still parses, and statements may omit semicolons and have spaces around links.',
  section: 'Flowchart',
  tags: ['flowchart', 'layout', 'dagre', 'elk', 'declarations'],
  docs: ['repo/packages/mermaid/src/docs/syntax/flowchart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
