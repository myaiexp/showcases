// Three.js example: updating a BufferGeometry over time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Updating a geometry over time',
  summary:
    'A line allocated for 500 points that grows by moving BufferGeometry.setDrawRange, with an option to rewrite the positions each frame and flag them with needsUpdate.',
  section: 'Next Steps',
  tags: ['BufferGeometry', 'setDrawRange', 'needsUpdate', 'BufferAttribute', 'Line'],
  docs: [
    'repo/manual/pages/how-to-update-things.html',
    'repo/docs/pages/BufferGeometry.html.md',
    'repo/docs/pages/BufferAttribute.html.md',
    'repo/docs/pages/Line.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
