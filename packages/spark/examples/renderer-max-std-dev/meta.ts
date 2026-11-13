// Spark example: SparkRenderer.maxStdDev swept across its documented range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'maxStdDev: the Gaussian cutoff',
  summary:
    'A torus knot drawn with SparkRenderer.maxStdDev, the number of standard deviations from its centre that each Gaussian is rasterised to. It sweeps sqrt(4) to sqrt(9), the range the docs call acceptable, until you take the slider, which goes lower so the shrinking, harder-edged splats show. A smaller value draws smaller quads, which is the performance lever the tuning page recommends.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'maxStdDev', 'performance'],
  docs: ['repo/docs/docs/spark-renderer.md', 'repo/docs/docs/performance.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
