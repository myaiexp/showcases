// Sigma.js example: stage style rules driven by graph state flags
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Stage style properties',
  summary:
    'The stage styles key sets the container background and cursor, with rule-level whenState predicates on the graph state flags isDragging and hasHovered. Drag the stage or hover a node to see it change.',
  section: 'Reference',
  tags: ['stage', 'graph state', 'cursor', 'background'],
  docs: [`${DOCS}/reference/style-properties.md`, `${DOCS}/reference/style-value-types.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
