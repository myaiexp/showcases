// mermaid example: Sankey flows and link colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sankey flows and link colours',
  summary:
    'CSV rows of source, target and value become flows whose width follows the value. Link colour, alignment, label style and custom node colours come from config.',
  section: 'Sankey',
  tags: ['sankey', 'linkColor', 'nodeAlignment', 'nodeColors', 'labelStyle'],
  docs: ['repo/packages/mermaid/src/docs/syntax/sankey.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
