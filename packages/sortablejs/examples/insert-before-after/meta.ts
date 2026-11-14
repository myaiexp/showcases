// Sortable.js example: priority boarders always land ahead of standard ones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Insert before or after',
  summary:
    'A boarding queue with two fare classes. Sortable proposes "before" or "after" for each hover, and the app overrules it so a standard ticket always lands behind the priority ones and priority tickets always jump ahead of standard.',
  section: 'Events',
  tags: ['onMove', 'willInsertAfter', 'related', 'return -1', 'return 1'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
