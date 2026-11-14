// Zdog example: Group windows, a house front with parts on a wall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group windows',
  summary:
    'The front of a little house: wall, roof, two windows and a door with a knob. Put them in a Group and they draw in the order added, so the windows always sit on the wall. With a plain Anchor they sort by depth, and as the house turns the windows flicker behind the wall.',
  section: 'Modeling',
  tags: ['Group', 'Anchor', 'Rect', 'Shape', 'copy', 'translate'],
  docs: [
    'repo/modules/docs/group-concept.hbs',
    'repo/modules/docs/modeling-concepts.hbs',
    'repo/modules/docs/api-group.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
