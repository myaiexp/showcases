// vchart example: Axis innerOffset keeps edge marks whole
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis innerOffset keeps edge marks whole",
  summary: "A scatter whose points sit exactly on the axis limits would have half of each symbol clipped. innerOffset on the axes insets the plot area, and sliders grow the four margins.",
  section: "Option: Components",
  tags: ["axes.innerOffset","left","right","top","bottom"],
  docs: [
    'repo/docs/assets/option/en/component/axis-common/cartesian-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
