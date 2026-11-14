// Sortable.js example: a live readout of what Sortable is holding mid-drag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag state HUD',
  summary:
    'Drag a recipe from the library into tonight\'s menu and a small display reads out, live, which list is active, which element is in hand, the floating copy under the pointer, and the copy left behind in the library.',
  section: 'Static API',
  tags: ['Sortable.active', 'Sortable.dragged', 'Sortable.ghost', 'Sortable.clone', 'forceFallback'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
