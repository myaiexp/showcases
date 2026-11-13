// Sigma.js example: hover and search highlighting through custom state
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Search and hover highlighting',
  summary:
    'Custom node, edge and graph state flags plus conditional style rules grey out everything but a hovered node\'s neighbourhood or the nodes matching a search query.',
  section: 'Adding interactivity',
  tags: ['customNodeState', 'conditional styles', 'search', 'setNodeState'],
  docs: [
    `${DOCS}/how-to/interactivity/hover-search.mdx`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/get-started/add-interactivity.mdx`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
