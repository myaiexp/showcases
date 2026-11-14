// Spark example: SparkRenderer.falloff from the Gaussian kernel to flat shading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'falloff: Gaussian to flat',
  summary:
    'A shell of large round splats rendered with SparkRenderer.falloff. At 1 each splat fades out as a Gaussian; at 0 the kernel has no falloff and every splat is a flat disc. It eases between the two until you take the slider.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'falloff'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
