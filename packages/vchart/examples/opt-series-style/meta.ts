// vchart example: seriesStyle: restyle one series by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "seriesStyle: restyle one series by name",
  summary:
    "seriesStyle picks a group of the seriesField by name and overrides the style of its marks: a thick dashed orange line with large points for the chosen series. A select (or the card) moves the override to another group.",
  section: "Option: Common",
  tags: ["seriesStyle","seriesField","line","point","name"],
  docs: [
    'repo/docs/assets/option/en/common/series-style.md',
    'repo/docs/assets/option/en/common/mark-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
