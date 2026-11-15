// vega example: Pie: Start and End Angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie: Start and End Angle",
  summary:
    "Six wedges are laid out by pie; sliders for startAngle and endAngle turn it into a gauge or any sector, and innerRadius makes a donut.",
  section: "Transforms: Layout",
  tags: ["transform.pie.startAngle", "transform.pie.endAngle", "mark.arc"],
  docs: ["repo/docs/docs/transforms/pie.md", "repo/docs/docs/transforms/pie.vg.json", "repo/docs/docs/marks/arc.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
