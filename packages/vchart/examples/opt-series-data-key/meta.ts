// vchart example: Series dataKey: bars that follow their data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Series dataKey: bars that follow their data",
  summary:
    "dataKey ties each bar to a field of its datum. After updateData reorders a ranking, bars with a key slide to their new place; without one the bars stay in position and change height. A select switches the key on and off.",
  section: "Option: Common",
  tags: ["dataKey","updateData","morph","key"],
  docs: [
    'repo/docs/assets/option/en/common/series.md',
    'repo/docs/assets/option/en/common/data.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
