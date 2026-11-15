// l7 example: Earth bloom layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth bloom layer',
  summary:
    'shape(\'bloomSphere\') adds a soft halo that glows both outside and inside the globe\'s rim. Layer it with the atmosphere, or use it alone; opacity sets the strength.',
  section: 'Experiment',
  tags: ['EarthLayer', 'shape(\'bloomSphere\')', 'color', 'opacity'],
  docs: [
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
