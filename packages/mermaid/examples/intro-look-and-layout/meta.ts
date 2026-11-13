// mermaid example: select the look and layout of a flowchart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Look and layout picker',
  summary:
    'One flowchart redrawn with the classic, neo or hand-drawn look and the dagre or ELK layout, chosen through `look` and `layout` in the diagram frontmatter.',
  section: 'Introduction',
  tags: ['look', 'layout', 'handDrawn', 'elk', 'dagre', 'frontmatter'],
  docs: ['repo/packages/mermaid/src/docs/intro/syntax-reference.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
