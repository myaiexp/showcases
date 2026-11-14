// vchart example: Sankey with fixed sizes and overflow scroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey with fixed sizes and overflow scroll",
  summary: "When nodeWidth, nodeHeight or linkWidth are fixed in pixels the diagram can outgrow its region; overflow turns on scroll bars in x, y or both instead of squeezing it. A select picks the mode and a slider the fixed node height.",
  section: "Option: Series",
  tags: ["sankey.overflow","nodeHeight","nodeWidth","nodeGap"],
  docs: [
    'repo/docs/assets/option/en/series/sankey.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
