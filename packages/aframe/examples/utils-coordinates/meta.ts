// aframe example: utils.coordinates: isCoordinates, parse and stringify
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.coordinates: isCoordinates, parse and stringify',
  summary:
    'Feeds vec3 and vec4 strings (and one that is not coordinates) to AFRAME.utils.coordinates. The board shows what isCoordinates, parse and stringify return and a sphere moves to the parsed point.',
  section: 'Core API',
  tags: ['AFRAME.utils.coordinates', 'isCoordinates', 'parse', 'stringify', 'vec3', 'vec4'],
  docs: ['repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
