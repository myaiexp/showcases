// deck-gl example: SimpleMeshLayer: Transform Matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SimpleMeshLayer: Transform Matrix',
  summary:
    'getTransformMatrix returns a 4x4 column-major matrix per instance and overrides the orientation, scale and translation accessors: here a tower stretched, sheared and spun by sliders.',
  section: 'Mesh layers',
  tags: ['SimpleMeshLayer', 'getTransformMatrix', 'updateTriggers'],
  docs: ['repo/docs/api-reference/mesh-layers/simple-mesh-layer.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
