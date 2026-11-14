// vchart example: FAQ: hover stroke hidden under a neighbour slice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: hover stroke hidden under a neighbour slice",
  summary:
    "A thick hover stroke on a pie sector is partly covered by the next sector. pie.state.hover.zIndex: 1 lifts the hovered sector over its neighbours; the card hovers each sector in turn and flips the setting.",
  section: 'FAQ',
  tags: ['pie.state.hover','zIndex','stroke','setHovered'],
  docs: [
    'repo/docs/assets/faq/en/136- How to prevent the stroke from being obscured when hovering over pie chart sectors.md',
    'repo/docs/assets/faq/en/200-When hovering over a donut chart, how to configure the style of donut chart.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
