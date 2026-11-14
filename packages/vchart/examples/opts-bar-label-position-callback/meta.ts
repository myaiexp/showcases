// vchart example: Bar labels: position as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bar labels: position as a function",
  summary: "A bar label's position can be a callback on the datum, so each label picks its own side: here the tallest bar's label sits inside and the others outside, negative bars flip below. A select switches between the callback and fixed positions.",
  section: "Option: Series",
  tags: ["bar.label.position","callback","top-right","inside-top","outside"],
  docs: [
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
