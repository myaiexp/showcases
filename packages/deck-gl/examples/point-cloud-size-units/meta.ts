// deck-gl example: PointCloudLayer sizeUnits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PointCloudLayer sizeUnits',
  summary:
    'A hill of points with 3D longitude, latitude and altitude positions: sizeUnits switches pointSize between pixels, meters and common units, and antialiasing smooths the point edges.',
  section: 'Core layers',
  tags: ['PointCloudLayer', 'sizeUnits', 'pointSize', 'antialiasing'],
  docs: [
    'repo/docs/api-reference/layers/point-cloud-layer.md',
    'repo/docs/developer-guide/coordinate-systems.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
