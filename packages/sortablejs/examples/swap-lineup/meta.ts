// Sortable.js example: a running order that names who traded places
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Report who traded places',
  summary:
    'A relay team\'s running order. Drop one runner on another to swap legs, and a short news feed reports exactly who traded with whom, using the swapped-with runner the drop event hands you.',
  section: 'Swap',
  tags: ['swap', 'swapItem', 'swapClass', 'onEnd'],
  docs: ['repo/plugins/Swap/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
