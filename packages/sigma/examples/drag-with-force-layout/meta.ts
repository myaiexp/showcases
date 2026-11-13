// Sigma.js example: dragging nodes inside a running force layout
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Dragging inside a live force layout',
  summary:
    'graphology-layout-force keeps relaxing the graph while you drag. Its isNodeFixed option reads sigma\'s isDragged node state, so the held node stays pinned and the rest reflows.',
  section: 'Adding interactivity',
  tags: ['enableNodeDrag', 'force layout', 'isNodeFixed', 'getNodeState'],
  docs: [`${DOCS}/how-to/interactivity/drag-drop.mdx`, `${DOCS}/reference/state-flags.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
