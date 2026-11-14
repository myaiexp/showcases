// deck-gl example: PointCloudLayer normals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PointCloudLayer normals',
  summary:
    'White points on a sphere shaded by getNormal: with its own outward normal the sphere reads as a solid ball, with the default [0, 0, 1] normal every point is lit the same.',
  section: 'Core layers',
  tags: ['PointCloudLayer', 'getNormal', 'lighting'],
  docs: [
    'repo/docs/api-reference/layers/point-cloud-layer.md',
    'repo/docs/api-reference/core/orbit-view.md',
    'repo/docs/developer-guide/using-effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
