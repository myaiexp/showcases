// Sigma.js example: dragging nodes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Drag and drop nodes',
  summary:
    'enableNodeDrag with autoRescale "once" lets users reposition nodes without the viewport rescaling. The isDragged state flag styles the node being held.',
  section: 'Adding interactivity',
  tags: ['enableNodeDrag', 'autoRescale', 'isDragged', 'nodeDrag'],
  docs: [
    `${DOCS}/how-to/interactivity/drag-drop.mdx`,
    `${DOCS}/reference/events.md`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/settings.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
