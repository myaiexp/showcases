// vchart example: Circular progress clamp: values past the axis range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular progress clamp: values past the axis range",
  summary: "A circular progress ring is given a value above its maxValue. With clamp off the arc runs past the end of the axis; with clamp on it is cut at the range. A slider moves the value past 100 and a select flips clamp.",
  section: "Option: Series",
  tags: ["circularProgress.clamp","maxValue","progress"],
  docs: [
    'repo/docs/assets/option/en/series/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
