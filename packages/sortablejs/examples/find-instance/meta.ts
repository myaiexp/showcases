// Sortable.js example: locking and speeding up lists from a control panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Find a list\'s instance',
  summary:
    'Three shift rosters and a manager\'s panel outside them. A lock button and a speed slider look each roster up from its element alone, so the panel can freeze a shift or change every list\'s animation without holding on to anything.',
  section: 'Static API',
  tags: ['Sortable.get', 'option()', 'group', 'disabled', 'animation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
