// Spark example: SparkRenderer minPixelRadius and maxPixelRadius clamps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'minPixelRadius and maxPixelRadius',
  summary:
    'A long road of tiny splats with three giant ones beside the camera. SparkRenderer.minPixelRadius drops splats whose projected radius is under that many pixels, so raising it eats the road from the far end inward; maxPixelRadius caps how large any splat is drawn, so lowering it shrinks the giants to small blobs. Both ease together until you take a slider.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'minPixelRadius', 'maxPixelRadius'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
