// observable-plot example: Markers: marker as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Markers: marker as a function',
  summary:
    'A marker can be a function that receives the stroke colour and returns an SVG marker element; here diamond, square and triangle markers.',
  section: 'Markers',
  tags: ['lineY', 'marker'],
  docs: ['repo/docs/features/markers.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
