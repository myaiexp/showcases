// Three.js example: a BufferGeometry built from raw attribute arrays and updated each frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom BufferGeometry',
  summary:
    'A sphere of loose quads is built in code from position, normal and uv BufferAttributes plus an index. Each frame the position array is rewritten and flagged with needsUpdate, so the quads ripple in and out.',
  section: 'Fundamentals',
  tags: ['BufferGeometry', 'BufferAttribute', 'needsUpdate', 'DynamicDrawUsage', 'setIndex'],
  docs: [
    'repo/manual/pages/custom-buffergeometry.html',
    'repo/docs/pages/BufferGeometry.html.md',
    'repo/docs/pages/BufferAttribute.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
