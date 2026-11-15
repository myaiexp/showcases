// tanstack-charts example: A draggable scale handle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A draggable scale handle',
  summary:
    'handleX is one ordered value on the x scale that can be dragged or moved with the keyboard. It snaps to the candidates in values, proposes preview changes while dragging and a commit on release, and moves one candidate per arrow key. The readout lists the proposals.',
  section: 'Interactions and Selections',
  tags: ['handleX', 'HandleXChange', 'values', 'cross', 'preview', 'commit'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
