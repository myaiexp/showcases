// observable-plot example: Markers: markers follow the path, not the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Markers: markers follow the path, not the data',
  summary:
    'On a curve other than linear, markers sit at path vertices, not at the data; plus-shaped dots mark the actual data for comparison.',
  section: 'Markers',
  tags: ['lineY', 'dotY', 'marker', 'curve'],
  docs: ['repo/docs/features/markers.md', 'repo/docs/features/curves.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
