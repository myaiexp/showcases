// echarts example: Half donut with endAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Half donut with endAngle',
  summary:
    'A doughnut cut to an arc with startAngle and endAngle. Drag the sliders or pick a preset for a top half, right half or three quarters, and flip clockwise to run the sectors the other way.',
  section: 'Option: series.pie',
  tags: ['pie', 'startAngle', 'endAngle', 'clockwise', 'padAngle'],
  docs: ['repo/en/option/series/pie.md', 'repo/contents/en/basics/release-note/5-5-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
