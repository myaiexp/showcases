// observable-plot example: Geo: sphere and graticule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo: sphere and graticule',
  summary:
    'The sphere helper outlines the projected globe and graticule draws meridians and parallels. Pick a projection and rotate the globe with the slider.',
  section: 'Mark: Geo',
  tags: ['sphere', 'graticule', 'projection', 'rotate'],
  docs: ['repo/docs/marks/geo.md', 'repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
