// l7 example: Earth mode: base sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth mode: base sphere',
  summary:
    'The Earth map type from @antv/l7-maps swaps the flat map for a globe, and an EarthLayer with shape(\'base\') is the sphere itself. Its surface texture is a world map drawn on a canvas, so nothing is fetched.',
  section: 'Experiment',
  tags: ['Earth', 'EarthLayer', 'shape(\'base\')', 'source', 'globalOptions', 'radius', 'animate'],
  docs: [
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
