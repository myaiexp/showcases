// vchart example: Donut chart: innerRadius and outerRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Donut chart: innerRadius and outerRadius",
  summary:
    "innerRadius cuts a hole in the pie and outerRadius sets how much of the layout radius it fills. In the full view two sliders move both radii; the preview steps from a plain pie to a thin ring.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'innerRadius', 'outerRadius', 'donut'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
