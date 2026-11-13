// Spark example: a target SparkRenderer rendering a second camera as an inset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A second viewpoint with target',
  summary:
    'A second SparkRenderer built with a target and left out of the scene renders the same torus knot from another camera into a texture, by calling renderTarget() each frame before the main render. The texture is mapped onto a small plane attached to the main camera, for a live picture-in-picture. In Spark 2 each viewpoint is its own SparkRenderer, with its own sort order and settings.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'target', 'renderTarget', 'viewpoint', 'picture-in-picture'],
  docs: [
    'repo/docs/docs/spark-renderer.md',
    'repo/docs/docs/new-spark-renderer.md',
    'repo/docs/docs/0.1-2.0-migration-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
