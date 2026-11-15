// l7 example: Earth radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth radius',
  summary:
    'style({ radius }) sets the size of the sphere in the scene; the camera stays put, so a larger radius fills more of the view.',
  section: 'Experiment',
  tags: ['EarthLayer', 'style', 'radius'],
  docs: [
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
