// Sigma.js example: hover highlighting with reducers
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Highlighting with reducers',
  summary:
    'The reducer alternative to conditional styles: a hoveredNode graph state field read by nodeReducer and edgeReducer, which grey out nodes and hide edges outside the neighbourhood.',
  section: 'Adding interactivity',
  tags: ['nodeReducer', 'edgeReducer', 'customGraphState', 'hover'],
  docs: [`${DOCS}/how-to/interactivity/hover-search.mdx`, `${DOCS}/reference/state-flags.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
