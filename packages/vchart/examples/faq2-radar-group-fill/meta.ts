// vchart example: FAQ: radar fill colour by group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: radar fill colour by group",
  summary:
    "area.style.fill on a radar accepts a callback on the datum, so group A is filled gold and group B blue regardless of the order colours would come in. Values change on a timer.",
  section: 'FAQ',
  tags: ['radar','area.style.fill','callback','seriesField'],
  docs: [
    'repo/docs/assets/faq/en/178- How to set different fill colors based on groups in a radar chart.md',
    'repo/docs/assets/option/en/series/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
