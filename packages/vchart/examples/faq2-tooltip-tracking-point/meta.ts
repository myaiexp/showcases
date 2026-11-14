// vchart example: FAQ: a tracking point that follows the tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: a tracking point that follows the tooltip",
  summary:
    "dimensionHover reports the datum under the pointer, and convertDatumToPosition turns it into canvas coordinates, where a plain DOM ring is moved. The card steps the same marker through the data from a timer.",
  section: 'FAQ',
  tags: ['dimensionHover','convertDatumToPosition','setDimensionIndex','tooltip'],
  docs: [
    'repo/docs/assets/faq/en/142- How to add tracking points in VChart based on Tooltip behavior.md',
    'repo/docs/assets/api/en/API/event.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
