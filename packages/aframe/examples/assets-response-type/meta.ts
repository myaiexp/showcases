// aframe example: a-asset-item response-type: text or arraybuffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'a-asset-item response-type: text or arraybuffer',
  summary:
    'The same model read three ways: an .obj as the default text, a binary glb read as text (a garbled string), and the glb with response-type="arraybuffer", which gives bytes a loader can use.',
  section: 'Core API',
  tags: ['a-asset-item', 'response-type', 'arraybuffer', 'gltf-model', 'data'],
  docs: ['repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
