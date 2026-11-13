// Spark example: SparkRenderer.minAlpha culling faint splats on an opacity ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'minAlpha threshold',
  summary:
    'A helix of splats whose opacity ramps from almost invisible to solid. SparkRenderer.minAlpha is the smallest alpha Spark will draw: splats below it are skipped outright, so raising it eats the helix from its faint end. The default is half of one 8-bit step, so nothing visible is lost; larger values trade faint haze for fewer splats to blend.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'minAlpha', 'opacity'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
