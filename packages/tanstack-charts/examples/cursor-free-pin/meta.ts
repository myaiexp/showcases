// tanstack-charts example: Pinning a free cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinning a free cursor',
  summary:
    'With pin true, a click or tap pins the free cursor where it is, and the next click dismisses it. A pinned cursor ignores further pointer movement. The readout shows the controller state, including pinned and source.',
  section: 'Interactions and Selections',
  tags: ['cursorHost', 'pin', 'free', 'pinned', 'ChartCursorState'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
