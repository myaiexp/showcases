// deck-gl example: SimpleMeshLayer: _instanced Off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SimpleMeshLayer: _instanced Off',
  summary:
    'The experimental _instanced prop: by default mesh positions are metre offsets scaled per instance; with false they are world deltas, here longitude and latitude degrees added to the anchor.',
  section: 'Mesh layers',
  tags: ['SimpleMeshLayer', '_instanced', 'mesh', 'getPosition'],
  docs: ['repo/docs/api-reference/mesh-layers/simple-mesh-layer.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
