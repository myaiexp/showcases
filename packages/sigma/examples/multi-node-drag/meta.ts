// Sigma.js example: multi-node drag with selection and snapping
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Multi-node drag with grid snapping',
  summary:
    'Select nodes with click and shift+click, then drag one to move the whole selection. getDraggedNodes reads a custom isSelected state and dragPositionToAttributes snaps positions to a half-unit grid.',
  section: 'Adding interactivity',
  tags: ['getDraggedNodes', 'dragPositionToAttributes', 'customNodeState', 'selection'],
  docs: [`${DOCS}/how-to/interactivity/drag-drop.mdx`, `${DOCS}/reference/state-flags.md`, `${DOCS}/reference/settings.md`, `${DOCS}/reference/events.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
