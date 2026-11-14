// Sortable.js example: touchStartThreshold lets a trembling finger finish a delayed pick-up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A shaky finger still picks up the item',
  summary:
    'Holding a row for a moment is hard when your finger trembles. Allow a few pixels of drift during the wait and the row lifts anyway. A simulated shaky finger lets you test the limit.',
  section: 'Dragging rules',
  tags: ['touchStartThreshold', 'delay', 'forceFallback', 'onChoose'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
