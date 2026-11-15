// vega example: Quantile Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Quantile Scale",
  summary:
    "Sixty skewed values coloured by quantile boundaries. However many colours the range asks for (3 to 8), every colour covers about the same count of dots, so the bins crowd where the data does.",
  section: "Scales",
  tags: ['scale.type','scale.range.scheme','scale.range.count'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
