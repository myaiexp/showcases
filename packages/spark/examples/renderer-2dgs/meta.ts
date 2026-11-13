// Spark example: SparkRenderer.enable2DGS on splats whose z scale is exactly zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'enable2DGS: oriented discs',
  summary:
    'A hundred and thirty flat splats tiling a sphere, each given a z scale of exactly 0 and rotated to face outward. With SparkRenderer.enable2DGS on, a zero scale axis makes the other two axes an exact oriented 2D Gaussian disc, which the shader draws directly, skipping the covariance blur and pixel-radius clamps; with it off Spark renders the usual projected 3D Gaussian slice, where the raised blurAmount (3 here) is added to the covariance and fattens edge-on discs into bars. It flips every few seconds until you use the checkbox or the blur slider.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'enable2DGS', '2DGS', 'pushSplat'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
