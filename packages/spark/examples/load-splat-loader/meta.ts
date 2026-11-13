// Spark example: SplatLoader.loadAsync, then a SplatMesh from the result
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading with SplatLoader',
  summary:
    'The THREE.Loader route from the docs: SplatLoader.loadAsync(url, onProgress) resolves a PackedSplats, which a SplatMesh wraps, flips from OpenCV to OpenGL axes with the quaternion (1, 0, 0, 0), moves and scales. The full view loads butterfly.spz; the card loads a blob: URL of a procedural .spz.',
  section: 'Loading Splats',
  tags: ['SplatLoader', 'loadAsync', 'PackedSplats', 'SplatMesh', 'onProgress'],
  docs: ['repo/docs/docs/loading-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
