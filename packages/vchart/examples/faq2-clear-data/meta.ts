// vchart example: FAQ: clear the marks, keep the axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: clear the marks, keep the axes",
  summary:
    "updateData with an empty array wipes the marks while the axes, legend and layout stay; release would destroy the whole chart. Buttons clear and restore; the card toggles on a timer.",
  section: 'FAQ',
  tags: ['updateData','release','empty data'],
  docs: [
    'repo/docs/assets/faq/en/193-How to clear charts and data.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
