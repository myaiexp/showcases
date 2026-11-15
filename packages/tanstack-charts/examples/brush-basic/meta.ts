// tanstack-charts example: Horizontal brush with named steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Horizontal brush with named steps',
  summary:
    'brushX owns a persistent range with draggable edges and keyboard handles. The values array defines the steps the range snaps to and the keyboard moves by, and the application stores each committed range. Drag the band or its edges, or Tab to a handle and use the arrow keys.',
  section: 'Interactions and Selections',
  tags: ['brushX', 'BrushRange', 'values', 'controlledSignal', 'commit'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
