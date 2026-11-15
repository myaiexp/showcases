// vega example: Range from a Data Set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Range from a Data Set",
  summary:
    "Colours live in a data set of palettes. The ordinal scale reads its range from the rows of the chosen palette, so changing the palette name recolours the bars with no change to the scale.",
  section: "Scales",
  tags: ['scale.range.data','scale.type','transform.filter'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
