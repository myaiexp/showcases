// Adapters example: TSL uniform() slots and bare UniformNodes animated on a WebGPURenderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: TSL uniform nodes on WebGPURenderer',
  summary: 'A NodeMaterial whose colorNode and offsetNode slots hold uniform() nodes is animated by slot name (colorNode, offsetNodeY), while two other spheres share bare uniform nodes animated directly with color and value. Runs on WebGPURenderer, which falls back to WebGL2.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'TSL', 'uniform', 'WebGPURenderer', 'NodeMaterial', 'colorNode', 'offsetNodeY'],
  docs: [
    'pages/animejs-com/documentation/adapters/threejs-adapter/materials-and-uniforms.md',
    'pages/animejs-com/documentation/adapters/threejs-adapter/threejs-object-property-adapter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
