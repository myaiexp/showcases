// tanstack-charts example: A handle paired with a range input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A handle paired with a range input',
  summary:
    'A chart handle is a pointer shortcut; a native range input gives every user the same control with its own labelling. Both write the same controlled week, so dragging either moves the other. The chart renders the state and does not become the form control.',
  section: 'Interactions and Selections',
  tags: ['handleX', 'range input', 'controlledSignal', 'accessibility'],
  docs: ['repo/docs/guides/interactions-and-selections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
