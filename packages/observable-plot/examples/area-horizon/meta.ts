// observable-plot example: Area: horizon chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: horizon chart',
  summary:
    'The same area repeated once per band, clipped to a narrow y domain and coloured by band, so large values read as colour. A slider sets the band count.',
  section: 'Mark: Area',
  tags: ['areaY', 'facet', 'clip', 'fill'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
