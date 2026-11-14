// vchart example: Brush markTypeFilter on a line chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Brush markTypeFilter on a line chart",
  summary: "A brush over a line chart normally dims the line as well as the points. markTypeFilter lists the mark types the brush must leave alone, so only the points react while the line stays whole. A select toggles the filter.",
  section: "Option: Components",
  tags: ["brush.markTypeFilter","inBrush","outOfBrush","line chart"],
  docs: [
    'repo/docs/assets/option/en/component/brush.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
