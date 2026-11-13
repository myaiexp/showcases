// Sigma.js example: refusing to drag specific nodes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Locked nodes that refuse to drag',
  summary:
    'Nodes flagged "locked" can\'t be dragged. Compare the two documented ways to cancel: a getDraggedNodes that returns an empty list, and preventSigmaDefault() on nodeDragStart.',
  section: 'Adding interactivity',
  tags: ['getDraggedNodes', 'preventSigmaDefault', 'nodeDragStart', 'enableNodeDrag'],
  docs: [`${DOCS}/how-to/interactivity/drag-drop.mdx`, `${DOCS}/reference/events.md`, `${DOCS}/reference/settings.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
