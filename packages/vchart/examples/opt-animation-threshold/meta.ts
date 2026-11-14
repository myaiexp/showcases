// vchart example: Chart animationThreshold: no animation above a data size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart animationThreshold: no animation above a data size",
  summary:
    "animationThreshold turns the chart's animation off when the data is larger than the limit. The same bar chart is built over and over: below the threshold its bars grow in, above it they appear at once. Sliders set the bar count and the threshold.",
  section: "Option: Animation",
  tags: ["animationThreshold","animation","data size","appear"],
  docs: [
    'repo/docs/assets/changelog/en/release-v1.md',
    'repo/docs/assets/option/en/animate/animation.md',
    'repo/docs/assets/option/en/common/chart-spec.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
