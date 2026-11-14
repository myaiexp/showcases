// deck-gl example: PointCloudLayer material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PointCloudLayer material',
  summary:
    'The material prop on a lit point cloud: sliders for ambient, diffuse, shininess and specular colour change how the same points answer the default light.',
  section: 'Core layers',
  tags: ['PointCloudLayer', 'material', 'ambient', 'diffuse', 'shininess', 'specularColor'],
  docs: [
    'repo/docs/api-reference/layers/point-cloud-layer.md',
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/orbit-view.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
