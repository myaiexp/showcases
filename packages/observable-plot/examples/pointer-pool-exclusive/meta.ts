// observable-plot example: Pointer: the pool option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: the pool option',
  summary:
    'Two pointer marks on one chart. With pool true only one is shown at a time; with pool false both follow the pointer.',
  section: 'Interaction: Pointer',
  tags: ['dot', 'pointerX', 'pool', 'windowY'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
