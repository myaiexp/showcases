// vchart example: Donut indicator card
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Donut indicator card",
  summary:
    "indicator puts a title and content in the donut hole that show the total until a sector is hovered, using text functions of the datum. The full view follows the pointer; the preview has no pointer, so it rewrites the card for one sector after another.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'indicator', 'trigger', 'innerRadius'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
