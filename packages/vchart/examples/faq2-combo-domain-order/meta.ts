// vchart example: FAQ: x order of a combination chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: x order of a combination chart",
  summary:
    "Rows arrive in a scrambled order. data.fields.x.domain with sortIndex 0 puts the band axis in the listed order, in either direction, for bars and lines together.",
  section: 'FAQ',
  tags: ['data.fields','domain','sortIndex','common','band axis'],
  docs: [
    'repo/docs/assets/faq/en/111- How to sort x-axis labels in a combination chart.md',
    'repo/docs/assets/faq/en/153- How to sort data by specified fields.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
