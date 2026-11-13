// Three.js example: GPU particles simulated by a compute node over storage buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compute shader particles',
  summary:
    'Particle positions and velocities live in instancedArray() storage buffers. A compute node steps them toward an attractor every frame with renderer.compute(), and a sprite material reads the same buffers to draw.',
  section: 'TSL',
  tags: ['compute', 'instancedArray', 'storage', 'instanceIndex', 'SpriteNodeMaterial'],
  docs: ['repo/docs/llms-full.txt', 'repo/docs/pages/StorageBufferNode.html.md', 'repo/docs/pages/ComputeNode.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
