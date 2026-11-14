// vchart example: FAQ: which series draws on top in a combination
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: which series draws on top in a combination",
  summary:
    "In a common chart the series array is the stacking order: the later series is painted over the earlier one. Declaring the area before the line keeps the line and its points visible; a select swaps the order.",
  section: 'FAQ',
  tags: ["common chart","series order","area","line"],
  docs: [
    "repo/docs/assets/faq/en/49- How to configure the hierarchy in a combination chart.md",
    "repo/docs/assets/faq/en/81- How to solve the issue of the upper area chart obscuring the lower point chart in a combo chart.md",
    "repo/docs/assets/option/en/common/series.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
