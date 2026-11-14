// vchart example: Venn chart: sets and overlaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Venn chart: sets and overlaps",
  summary: "A venn series from rows of { sets, size }: single-set rows size the circles, multi-set rows size the overlaps. registerVennChart is called first; labels name each circle and its overlap. A slider changes how large the A-and-B overlap is.",
  section: "Option: Series",
  tags: ["venn","registerVennChart","categoryField","valueField","label","overlapLabel"],
  docs: [
    'repo/docs/assets/option/en/chart/venn.md',
    'repo/docs/assets/option/en/series/venn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
