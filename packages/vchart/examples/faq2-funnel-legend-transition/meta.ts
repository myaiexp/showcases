// vchart example: FAQ: funnel legend click transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: funnel legend click transition",
  summary:
    "Toggling a funnel legend item re-flows the remaining layers with VChart's built-in transition. The card changes the legend selection from code with setLegendSelectedDataById; a click does the same.",
  section: 'FAQ',
  tags: ['funnel','legends','setLegendSelectedDataById'],
  docs: [
    'repo/docs/assets/faq/en/112-How to add transition animations when clicking the legend of a funnel chart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
