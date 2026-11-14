// observable-plot example: Markers: every named marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Markers: every named marker',
  summary:
    'The Crimean War lines with each named marker (arrow, dot, circle, tick and the rest) chosen by the marker option; true means circle.',
  section: 'Markers',
  tags: ['lineY', 'marker'],
  docs: ['repo/docs/features/markers.md', 'repo/docs/data/crimea.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
