// vchart example: FAQ: order of the legend items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: order of the legend items",
  summary:
    "The legend follows the order of the series field in the data. Set data.fields domain with sortIndex, reverse the items in legends.data, or set legends.reverse; the select shows each.",
  section: 'FAQ',
  tags: ['legends.data','legends.reverse','fields.domain','sortIndex'],
  docs: [
    'repo/docs/assets/faq/en/133-How to control the display order of discrete legends.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
