// vchart example: FAQ: a minimal sparkline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: a minimal sparkline",
  summary:
    "Setting visible false on the axes, legend and tooltip, hiding points and the crosshair and shrinking padding leaves only the line. Three of them update on a timer.",
  section: 'FAQ',
  tags: ["axes.visible","legends.visible","padding","line"],
  docs: [
    "repo/docs/assets/faq/en/61-How to generate a simplified mini line chart.md",
    "repo/docs/assets/faq/en/5- How to position the chart on the far left of the canvas.md",
    "repo/docs/assets/option/en/component/cartesian-axis.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
