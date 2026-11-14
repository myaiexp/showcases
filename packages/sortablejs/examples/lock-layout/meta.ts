// Sortable.js example: toggling disabled at runtime with option()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dashboard with an Edit layout switch',
  summary:
    'A dashboard that is safe to click around in: tiles are locked until you turn on Edit layout, and lock again when you turn it off.',
  section: 'Dragging rules',
  tags: ['disabled', 'option()'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
