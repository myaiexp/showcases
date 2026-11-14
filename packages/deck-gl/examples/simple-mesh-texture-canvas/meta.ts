// deck-gl example: SimpleMeshLayer: Canvas Texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SimpleMeshLayer: Canvas Texture',
  summary:
    'A texture drawn on a canvas and handed to the layer, mapped by the mesh texCoords; textureParameters pick linear or nearest filtering, and without a texture getColor paints the mesh.',
  section: 'Mesh layers',
  tags: ['SimpleMeshLayer', 'texture', 'textureParameters', 'texCoords'],
  docs: ['repo/docs/api-reference/mesh-layers/simple-mesh-layer.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
