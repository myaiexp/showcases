// Sortable.js example: a waiting-room queue that can drop someone in between rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drop in between',
  summary:
    'Two identical waiting-room queues side by side. In one, a row trades places when you reach its middle. With invertSwap, only the edges count, so you slot a name in between neighbours.',
  section: 'Swap zones and direction',
  tags: ['invertSwap', 'swapThreshold'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
