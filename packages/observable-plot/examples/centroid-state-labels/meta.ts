// observable-plot example: Centroid: state name labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Centroid: state name labels',
  summary:
    'A text mark labels each US state with its name, positioned by the centroid transform on the state shapes after projection.',
  section: 'Transform: Centroid',
  tags: ['text', 'centroid', 'geo', 'albers-usa'],
  docs: ['repo/docs/transforms/centroid.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
