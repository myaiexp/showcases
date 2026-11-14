// deck-gl example: ScenegraphLayer: glTF from a data URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScenegraphLayer: glTF from a data URL',
  summary:
    'A binary glTF (glb) generated in code and handed to the scenegraph prop as a base64 data: URL, so it loads like any URL; _lighting switches between the glTF PBR model and flat shading.',
  section: 'Mesh layers',
  tags: ['ScenegraphLayer', 'scenegraph', '_lighting', 'getOrientation', 'sizeScale'],
  docs: ['repo/docs/api-reference/mesh-layers/scenegraph-layer.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
