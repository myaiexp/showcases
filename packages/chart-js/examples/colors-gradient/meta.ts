// Chart.js example: Gradient fills
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient fills',
  summary:
    'A dataset colour can be a CanvasGradient instead of a string. This line fades from a strong colour at its peak to nothing at the axis, and the gradient is rebuilt from the chart area so it always fits.',
  section: 'General',
  tags: ['gradient', 'CanvasGradient', 'scriptable', 'fill', 'chartArea'],
  docs: ['repo/docs/general/colors.md', 'repo/docs/general/options.md', 'repo/docs/charts/area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
