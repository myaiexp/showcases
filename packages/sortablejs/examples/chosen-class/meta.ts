// Sortable.js example: a line-up highlighted once a press has been held long enough
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Press and hold to pick up',
  summary:
    'A team line-up that only lets go of a player after you hold for half a second. The row turns red the moment it is picked up, so you know the drag will start.',
  section: 'Looks and animation',
  tags: ['chosenClass', 'delay', 'onChoose', 'onUnchoose'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
