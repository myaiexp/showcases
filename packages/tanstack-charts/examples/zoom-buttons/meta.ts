// tanstack-charts example: Zoom with application buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom with application buttons',
  summary:
    'With keyboard false the zoom control supplies only pointer and wheel input, and the application provides equivalent controls. These buttons compute new windows themselves and write the same controlled state, so every action is reachable without a pointer.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'keyboard', 'controlled window', 'buttons'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
