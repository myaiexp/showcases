// observable-plot example: Projection: domain and inset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: domain and inset',
  summary:
    'The projection domain option fits an azimuthal map to a GeoJSON circle; inset adds 10 pixels of padding. The slider changes the circle radius.',
  section: 'Projections',
  tags: ['projection', 'domain', 'inset', 'rotate', 'graticule', 'geo', 'frame'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
