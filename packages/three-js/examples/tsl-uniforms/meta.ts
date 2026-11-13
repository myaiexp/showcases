// Three.js example: uniform() nodes updated from UI controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Uniforms driven by sliders',
  summary:
    'uniform() nodes wrap numbers and colours for the GPU. Setting .value from slider and colour inputs updates the picture on the next frame, and one set of uniform nodes can feed several materials.',
  section: 'TSL',
  tags: ['uniform', 'colorNode', 'mix', 'smoothstep', 'input controls'],
  docs: ['repo/docs/llms-full.txt', 'repo/docs/pages/UniformNode.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
