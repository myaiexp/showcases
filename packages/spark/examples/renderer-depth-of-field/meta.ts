// Spark example: SparkRenderer focalDistance and apertureAngle depth of field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field',
  summary:
    'Five balls at increasing depth, drawn with SparkRenderer.focalDistance and apertureAngle: splats at the focal distance stay sharp and the rest blur in proportion to how far off they are. The focus racks from the nearest ball to the farthest; sliders set the focal distance and the aperture, and an aperture of 0 turns the effect off.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'focalDistance', 'apertureAngle', 'depth of field'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
