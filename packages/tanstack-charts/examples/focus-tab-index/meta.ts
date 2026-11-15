// tanstack-charts example: tabIndex and the keyboard switch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'tabIndex and the keyboard switch',
  summary:
    'keyboard enables arrow-key navigation and makes the chart surface a tab stop; tabIndex sets which tab index it gets. Setting keyboard to false removes the navigation and forces tabindex -1. The readout shows the attribute on the chart surface for each choice.',
  section: 'Focus and Interaction',
  tags: ['tabIndex', 'keyboard', 'focus'],
  docs: ['repo/docs/reference/focus-and-interaction.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
