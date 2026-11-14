// vchart example: Pie startAngle and endAngle: part circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie startAngle and endAngle: part circles",
  summary:
    "startAngle and endAngle in degrees limit the pie to an arc, here a half, three quarters or a quarter. layoutRadius: 'auto' sizes the radius from the available arc so the half pie fills the chart.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'startAngle', 'endAngle', 'layoutRadius'],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
