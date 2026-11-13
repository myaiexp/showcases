// Three.js example: GLTFExporter then GLTFLoader.parse, all in memory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'glTF export and reload',
  summary:
    'Builds a small scene, exports it with GLTFExporter as .glb or .gltf, then feeds the bytes to GLTFLoader.parse and shows the loaded copy next to the original. No network.',
  section: 'Getting Started',
  tags: ['GLTFExporter', 'GLTFLoader', 'parse', 'glb', 'gltf'],
  docs: [
    'repo/manual/pages/loading-3d-models.html',
    'repo/docs/pages/GLTFExporter.html.md',
    'repo/docs/pages/GLTFLoader.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
