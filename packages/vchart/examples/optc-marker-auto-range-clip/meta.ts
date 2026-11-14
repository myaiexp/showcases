// vchart example: Markers: autoRange and clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Markers: autoRange and clip",
  summary: "A markLine at 130 sits above a value axis that ends at 100. autoRange grows the axis range to include it; clip hides the part of a marker that leaves the plot. Selects toggle the two switches.",
  section: "Option: Components",
  tags: ["markLine.autoRange","markLine.clip","base marker"],
  docs: [
    'repo/docs/assets/option/en/component/marker-common/base-marker.md',
    'repo/docs/assets/option/en/component/mark-line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
