// observable-plot example: Projection: function returning a D3 projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: function returning a D3 projection',
  summary:
    'The projection option as a function of the frame size that returns a D3 azimuthal-equidistant projection, in a polar aspect with a clip angle.',
  section: 'Projections',
  tags: ['projection', 'geo', 'graticule', 'frame'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
