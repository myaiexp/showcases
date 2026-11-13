// Three.js example: colorNode composed from uv() and time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural colour with TSL',
  summary:
    'A MeshBasicNodeMaterial whose colorNode is a TSL expression of uv() and time: sines, a cosine palette, mix() and smoothstep() chained as methods, with no shader text.',
  section: 'TSL',
  tags: ['NodeMaterial', 'colorNode', 'uv', 'time', 'mix'],
  docs: ['repo/docs/llms-full.txt', 'repo/manual/pages/webgpurenderer.html'],
  provenance: 'pure',
  added: '2026-11-13',
});
