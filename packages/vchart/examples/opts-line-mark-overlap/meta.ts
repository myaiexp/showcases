// vchart example: Line points: markOverlap, pointDis and pointDisMul
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line points: markOverlap, pointDis and pointDisMul",
  summary: "On a dense line the point symbols pile up. With markOverlap off the series hides points that would touch; pointDis sets the minimum gap in pixels and pointDisMul a multiple of the symbol size. Controls change the three options.",
  section: "Option: Series",
  tags: ["line.markOverlap","pointDis","pointDisMul","point.style.size"],
  docs: [
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
