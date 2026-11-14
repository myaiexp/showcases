// Chart.js example: Radar range settings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar range settings",
  summary:
    "The radar scale can be fixed with min and max, widened with suggestedMin and suggestedMax, and rotated with startAngle (degrees, 0 at the top).",
  section: 'Axes',
  tags: ['min','max','suggestedMin','suggestedMax','startAngle','scales.r'],
  docs: ['repo/docs/axes/radial/linear.md','repo/docs/charts/radar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
