// Three.js example: drawing a Line from points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drawing lines',
  summary:
    'A Line made from a list of Vector3 points with BufferGeometry.setFromPoints and a LineBasicMaterial. Swap the point list to get an arrow, a circle or a zig-zag.',
  section: 'Getting Started',
  tags: ['Line', 'LineBasicMaterial', 'BufferGeometry', 'setFromPoints'],
  docs: [
    'repo/manual/pages/drawing-lines.html',
    'repo/docs/pages/Line.html.md',
    'repo/docs/pages/LineBasicMaterial.html.md',
    'repo/docs/pages/BufferGeometry.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
