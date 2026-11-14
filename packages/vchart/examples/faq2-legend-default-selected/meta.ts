// vchart example: FAQ: start with some lines hidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: start with some lines hidden",
  summary:
    "legends.defaultSelected lists the legend items that are on when the chart first draws; the rest start greyed out and hidden. The select picks the starting set, the legend still toggles after that.",
  section: 'FAQ',
  tags: ['legends.defaultSelected','multi-line','legend'],
  docs: [
    'repo/docs/assets/faq/en/165-How to configure the default selection effect of the legend component.md',
    'repo/docs/assets/faq/en/206- Can vchart multi-line charts limit the default rendered lines.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
