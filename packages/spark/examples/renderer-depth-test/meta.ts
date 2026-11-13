// Spark example: depthTest, depthWrite and transparent with opaque meshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Splats among opaque meshes',
  summary:
    'A torus knot of splats with an opaque sphere through its middle and a slab sliding in front. The SparkRenderer options depthTest, depthWrite and transparent configure its splat material: with depthTest on the meshes hide the splats behind them, with it off the splats paint over everything, depthWrite lets splats write depth (usually undesirable, since most of a Gaussian is transparent), and transparent chooses between three.js’s opaque and transparent render passes. depthTest flips by itself until you use a checkbox.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'depthTest', 'depthWrite', 'transparent', 'material'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
