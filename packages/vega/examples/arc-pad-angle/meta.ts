// vega example: Arc: Padded Donut Slices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: Padded Donut Slices",
  summary:
    "Six slices computed by the pie transform. padAngle spaces them apart (in radians), innerRadius hollows the centre; the card breathes both.",
  section: "Mark Types",
  tags: ['marks.arc.padAngle','marks.arc.innerRadius','transform.pie'],
  docs: ['repo/docs/docs/marks/arc.md', 'repo/docs/docs/marks/arc.vg.json', 'repo/docs/docs/transforms/pie.md', 'repo/docs/docs/transforms/pie.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
