// aframe example: Handling events in JavaScript: change-color-on-hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Handling events in JavaScript: change-color-on-hover',
  summary:
    'The docs\' change-color-on-hover component does by hand what event-set does: it listens for mouseenter and mouseleave from the cursor and sets the colour, restoring the default colour it read in init.',
  section: 'Introduction',
  tags: ['mouseenter', 'mouseleave', 'addEventListener', 'cursor', 'setAttribute', 'schema'],
  docs: ['repo/docs/introduction/interactions-and-controllers.md', 'repo/docs/components/cursor.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
