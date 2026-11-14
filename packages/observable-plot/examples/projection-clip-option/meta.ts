// observable-plot example: Projection: clip option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: clip option',
  summary:
    'The projection clip option: frame (the default), a great-circle radius in degrees, or null for no clipping.',
  section: 'Projections',
  tags: ['projection', 'clip', 'azimuthal-equidistant', 'graticule'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
