// vchart example: FAQ: hover an area point you cannot see
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: hover an area point you cannot see",
  summary:
    "Area points are drawn at zero opacity, so the chart looks clean, yet each one still takes hover. point.style fillOpacity/strokeOpacity 0 and point.state.hover opacity 1 reveal a point under the pointer, where visible: false would drop it from hit testing.",
  section: 'FAQ',
  tags: ['point','state.hover','fillOpacity','setHovered','area'],
  docs: [
    'repo/docs/assets/faq/en/107-How can we still make data points respond to hover events without displaying point graphics in area chart.md',
    'repo/docs/assets/faq/en/118- How to implement point hover effects in the vchart library.md',
    'repo/docs/assets/option/en/series/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
