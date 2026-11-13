// Spark example: focalAdjustment and clipXY on a splat wall filling the view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'focalAdjustment and clipXY',
  summary:
    'A wall of splats that overfills the frame. SparkRenderer.focalAdjustment scales the projected splat size, so higher values sharpen and shrink splats (2.0 matches the PlayCanvas renderer) and the gaps between them open up; clipXY sets how far outside the frame a splat centre may sit before it is culled, so values near 0.4 cut the wall down to its middle even though the splat bodies still overlap the view. The two ease in turn until you take a slider.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'focalAdjustment', 'clipXY'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
