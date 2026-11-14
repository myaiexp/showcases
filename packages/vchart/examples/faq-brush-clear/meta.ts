// vchart example: FAQ: clear the brush box at brushEnd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: clear the brush box at brushEnd",
  summary:
    "Version 2.2 has no clear-brush call, so the brushEnd handler empties each brush part of the brush component, as the FAQ shows. The selected count is still read from the event. A select keeps or clears the box.",
  section: 'FAQ',
  tags: ["brush","brushEnd","getAllComponents"],
  docs: [
    "repo/docs/assets/faq/en/58- How to clear the selection in the onbrushEnd event when using vchart.md",
    "repo/docs/assets/option/en/component/brush.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
