// vchart example: markArea with callback bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "markArea with callback bounds",
  summary: "markArea y and y1 accept callbacks over the series data, so a band mean minus and plus one standard deviation moves with the data. Update the data and the band follows.",
  section: "Option: Components",
  tags: ["markArea.y","markArea.y1","callback","updateData","IDataPosCallback"],
  docs: [
    'repo/docs/assets/option/en/component/mark-area.md',
    'repo/docs/assets/option/en/component/marker-common/marker-aggregation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
