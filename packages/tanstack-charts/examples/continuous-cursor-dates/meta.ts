// tanstack-charts example: Continuous cursor on a time axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous cursor on a time axis',
  summary:
    'The cursor works on any invertible numeric or temporal scale. With a UTC time scale on x, the label formats a Date and the position is a real date between the samples, not the nearest month.',
  section: 'Interactions and Selections',
  tags: ['continuousCursor', 'scaleUtc', 'Date', 'xLabel'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
