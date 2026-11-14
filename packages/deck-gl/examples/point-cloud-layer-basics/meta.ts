// deck-gl example: PointCloudLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PointCloudLayer basics',
  summary:
    'Thousands of 3D points with a position, a normal and a colour each, lit by the default lighting and viewed through an OrbitView in Cartesian coordinates.',
  section: 'Core layers',
  tags: ['PointCloudLayer', 'getPosition', 'getNormal', 'getColor', 'pointSize', 'OrbitView'],
  docs: [
    'repo/docs/api-reference/layers/point-cloud-layer.md',
    'repo/docs/api-reference/core/orbit-view.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
