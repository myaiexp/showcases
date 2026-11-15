// l7 example: Simple coordinates: line and polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simple coordinates: line and polygon',
  summary:
    'Lines and polygons take plane coordinates too. Without mapSize the plane is 10000 wide, so these shapes sit around (6000, 6000). The polygon has a hole, drawn through the second ring.',
  section: 'Experiment',
  tags: ['Map', 'version: \'SIMPLE\'', 'LineLayer', 'PolygonLayer', 'shape(\'fill\')', 'active'],
  docs: [
    'repo/site/docs/api/experiment/simple_coordinates.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
