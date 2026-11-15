// vega example: Bin-Ordinal Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin-Ordinal Scale",
  summary:
    "A histogram whose bars are coloured by a bin-ordinal scale built from the bin transform's own output. The legend labels each colour with its bin interval, and the bin count moves.",
  section: "Scales",
  tags: ['scale.type','scale.bins','transform.bin'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
