// Three.js example: an InstancedMesh with per-frame setMatrixAt and setColorAt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ten thousand instances',
  summary:
    'One InstancedMesh draws up to ten thousand boxes in a single draw call. Every frame rewrites each instance matrix and colour with setMatrixAt and setColorAt; a slider changes the count.',
  section: 'Optimization',
  tags: ['InstancedMesh', 'setMatrixAt', 'setColorAt', 'instanceMatrix', 'draw calls'],
  docs: [
    'repo/docs/pages/InstancedMesh.html.md',
    'repo/docs/pages/InstancedBufferAttribute.html.md',
    'repo/docs/pages/BufferAttribute.html.md',
    'repo/docs/pages/Info.html.md',
    'repo/docs/pages/OrbitControls.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
