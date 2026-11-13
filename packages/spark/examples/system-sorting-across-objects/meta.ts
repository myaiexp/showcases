// Spark example: splats from separate SplatMeshes sorted together for correct blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sorting splats across objects',
  summary:
    'Three translucent sphere shells, each its own SplatMesh, drift through one another. SparkRenderer gathers every visible splat in the scene into one list and sorts it back to front, so where the shells overlap the colours blend in the right order instead of one object pasting over another. Slide the spread to push them together.',
  section: 'System Design',
  tags: ['SparkRenderer', 'SplatMesh', 'sorting', 'SplatAccumulator'],
  docs: ['repo/docs/docs/system-design.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
