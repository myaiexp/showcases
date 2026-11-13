// Spark example: covSplats against the default for a non-uniform scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'covSplats: non-uniform scale',
  summary:
    'The same torus knot, scaled non-uniformly, in two views. On the left Spark 0.1 behaviour: the default encoding stores scale plus rotation, so a non-uniform SplatMesh scale is ignored in favour of an average. On the right the SparkRenderer is built with covSplats and accumExtSplats, and the SplatMesh with extSplats and covSplats, so splats carry a 3D covariance and the knot is genuinely squashed and stretched. Experimental in Spark 2.0; drag the left view, sliders set scale x, y and z.',
  section: 'New Features in 2.0',
  tags: ['covSplats', 'accumExtSplats', 'extSplats', 'SplatMesh', 'scale', 'experimental'],
  docs: ['repo/docs/docs/new-features-2.0.md', 'repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
