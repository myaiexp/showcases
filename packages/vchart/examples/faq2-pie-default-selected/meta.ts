// vchart example: FAQ: a pie sector selected from the start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: a pie sector selected from the start",
  summary:
    "pie.state.selected styles the selected sector (bigger radius, stroke); vchart.setSelected called right after renderSync selects one by datum, and setSelected(null) clears it. Clicking sectors moves the selection afterwards.",
  section: 'FAQ',
  tags: ['pie.state.selected','setSelected','renderSync'],
  docs: [
    'repo/docs/assets/faq/en/106- How to set a default selection for a sector in a VChart pie chart.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
