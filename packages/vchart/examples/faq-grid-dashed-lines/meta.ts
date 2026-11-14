// vchart example: FAQ: dashed axis grid lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: dashed axis grid lines",
  summary:
    "axes[i].grid.style.lineDash lists alternating dash and gap lengths for the grid; [0] is solid. A select swaps the pattern.",
  section: 'FAQ',
  tags: ["axes.grid.style","lineDash"],
  docs: [
    "repo/docs/assets/faq/en/12- How to set grid lines on VChart axes to dashed lines.md",
    "repo/docs/assets/option/en/component/axis-common/axis-grid.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
