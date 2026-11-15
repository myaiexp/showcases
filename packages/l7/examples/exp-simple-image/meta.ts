// l7 example: Simple coordinates: image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simple coordinates: image',
  summary:
    'Map with version \'SIMPLE\' replaces longitude and latitude with a plain 1000 x 1000 plane (mapSize). An ImageLayer takes its extent in those plane units: this floor plan sits at x 360-640, y 400-600.',
  section: 'Experiment',
  tags: ['Map', 'version: \'SIMPLE\'', 'mapSize', 'pitchEnabled', 'rotateEnabled', 'ImageLayer', 'extent'],
  docs: [
    'repo/site/docs/api/experiment/simple_coordinates.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
