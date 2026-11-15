// tanstack-charts example: Brush over dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush over dates',
  summary:
    'A brush on a time axis uses Date values: the values array lists the month starts the range snaps to, and format turns each into handle text for assistive technology. The readout shows the committed range as dates.',
  section: 'Interactions and Selections',
  tags: ['brushX', 'Date', 'values', 'format', 'scaleUtc'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
