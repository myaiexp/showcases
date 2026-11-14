// Sortable.js example: a settings panel that changes a live list's options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live option panel',
  summary:
    'A weekly menu planner with a small settings panel: lock the list, turn reordering off, change how fast rows slide, or require a press-and-hold. Every switch is applied to the running list with no rebuild.',
  section: 'Methods',
  tags: ['option()', 'disabled', 'sort', 'animation', 'delay'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
