// Three.js example: mergeGeometries versus one Mesh per box, with renderer.info draw calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Merging thousands of boxes',
  summary:
    'A procedural grid of boxes standing on a globe, drawn either as one mesh per box or merged into a single BufferGeometry with vertex colours. A live readout of renderer.info shows the draw calls.',
  section: 'Optimization',
  tags: ['BufferGeometryUtils', 'mergeGeometries', 'vertexColors', 'renderer.info', 'draw calls'],
  docs: [
    'repo/manual/pages/optimize-lots-of-objects.html',
    'repo/docs/pages/module-BufferGeometryUtils.html.md',
    'repo/docs/pages/Info.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
