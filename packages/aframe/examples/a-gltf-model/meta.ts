// aframe example: <a-gltf-model>: models from the asset system or inline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-gltf-model>: models from the asset system or inline',
  summary:
    '<a-gltf-model> maps src to the gltf-model component. A tree and a toy load through <a-asset-item> in <a-assets> (response-type arraybuffer, since their URLs do not end in .glb), a lantern through an inline url(). The models are glTF binaries generated in code, and each entity\'s model-loaded event counts them in.',
  section: 'Primitives',
  tags: ['a-gltf-model', 'gltf-model', 'a-asset-item', 'response-type', 'src', 'url()', 'model-loaded'],
  docs: ['repo/docs/primitives/a-gltf-model.md', 'repo/docs/components/gltf-model.md', 'repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
