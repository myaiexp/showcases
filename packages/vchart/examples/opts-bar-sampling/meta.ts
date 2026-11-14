// vchart example: Bar series sampling: lttb, min, max, sum and average
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bar series sampling: lttb, min, max, sum and average",
  summary: "A bar chart of 2000 values is far denser than the pixels. The bar series' sampling option downsamples the data before drawing, and samplingFactor tunes how much; each method keeps a different feature of the data. A select and a slider change them.",
  section: "Option: Series",
  tags: ["bar.sampling","samplingFactor","lttb","min","max","sum","average"],
  docs: [
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
