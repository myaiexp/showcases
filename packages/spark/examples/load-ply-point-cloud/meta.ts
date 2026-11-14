// Spark example: loading a plain x/y/z/r/g/b point-cloud PLY from memory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading a plain PLY point cloud',
  summary:
    'A rippled sheet of points is written as a minimal binary PLY, only x y z and red green blue per vertex, and passed as fileBytes. Spark recognises the PLY from its content and turns every vertex into a small coloured splat; the label shows the header, size and splat count, and SparkRenderer.preBlurAmount enlarges the tiny points so they read. The format select also tries ascii and big-endian headers, which Spark 2.4 rejects with an error shown in the label.',
  section: 'Loading Splats',
  tags: ['PLY', 'fileBytes', 'SplatMesh', 'point cloud', 'auto-detect'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
