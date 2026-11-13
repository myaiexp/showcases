// Spark example: SparkRenderer preBlurAmount against blurAmount on a fine knot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'preBlurAmount vs blurAmount',
  summary:
    'A torus knot of fine splats, softened by one blur option at a time. Both add a scalar to the 2D splat covariance, which blurs and enlarges each splat; blurAmount also reduces opacity to account for the blur, as anti-aliased training expects, so the knot thins out, while preBlurAmount leaves opacity alone and the knot fattens into a haze. It alternates between the two until you pick one.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'preBlurAmount', 'blurAmount', 'anti-aliasing'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
