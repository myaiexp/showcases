// l7 example: Simple coordinates: labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simple coordinates: labels',
  summary:
    'With the SIMPLE map, ordinary layers work on plane coordinates: a json source reads x and y (not lng and lat) and shape(\'t\', \'text\') labels the points. Hover a label to light it.',
  section: 'Experiment',
  tags: ['Map', 'version: \'SIMPLE\'', 'PointLayer', 'shape(\'text\')', 'parser', 'x', 'y', 'active'],
  docs: [
    'repo/site/docs/api/experiment/simple_coordinates.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
