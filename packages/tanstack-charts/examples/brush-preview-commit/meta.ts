// tanstack-charts example: Preview while dragging, commit on release
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preview while dragging, commit on release',
  summary:
    'A brush proposes preview changes while the pointer moves and a commit on release, with a cancel if the gesture is abandoned. The readout keeps the live preview and the committed range apart, so you can choose to update a heavy view only on commit.',
  section: 'Interactions and Selections',
  tags: ['brushX', 'preview', 'commit', 'cancel', 'BrushXChange'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
