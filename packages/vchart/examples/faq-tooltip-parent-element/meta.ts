// vchart example: FAQ: tooltip.parentElement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: tooltip.parentElement",
  summary:
    "The tooltip DOM hangs on document.body by default. Pointing tooltip.parentElement at another element moves it there, so it is clipped by that box; a select switches between the two.",
  section: 'FAQ',
  tags: ["tooltip.parentElement","tooltip"],
  docs: [
    "repo/docs/assets/faq/en/27-How to customize the mounting node of the tooltip component in VChart.md",
    "repo/docs/assets/faq/en/66-How do I customize the position of the tooltip to avoid occlusion.md",
    "repo/docs/assets/option/en/component/tooltip.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
