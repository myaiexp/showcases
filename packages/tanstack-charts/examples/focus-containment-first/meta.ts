// tanstack-charts example: Painted shapes win over distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Painted shapes win over distance',
  summary:
    'Pointer resolution starts with the topmost interactive shape that contains the pointer, and only falls back to distance when none does. A big dot with a small dot painted on top shows it: inside the overlap the small dot is focused, in the rest of the big dot the big one is, even where the centre of another dot is closer.',
  section: 'Focus and Interaction',
  tags: ['focus', 'interaction geometry', 'containment', 'dot', 'onFocusChange'],
  docs: ['repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
