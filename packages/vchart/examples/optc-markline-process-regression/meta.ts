// vchart example: markLine process: aggregate and regression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "markLine process: aggregate and regression",
  summary: "A markLine through coordinates lists the scatter points and its process option collapses them: y aggregated to one value, or xy: regression fitting a trend line across the cloud. A select switches the processing.",
  section: "Option: Components",
  tags: ["markLine.coordinates","process.x","process.y","process.xy","regression","aggregation"],
  docs: [
    'repo/docs/assets/option/en/component/mark-line.md',
    'repo/docs/assets/option/en/component/marker-common/marker-aggregation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
