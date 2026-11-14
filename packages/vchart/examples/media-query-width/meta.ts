// vchart example: Media query: width breakpoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Media query: width breakpoints",
  summary:
    "Two overlapping width queries on one bar chart: the first turns on value labels, the second also hides the month labels and trims the padding. The width is stepped from code, and a slider sets it in the full view.",
  section: "Self-adaption",
  tags: ['media','maxWidth','filterType: label','cartesianAxis-band'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Self-adaption/Media_Query.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
