// vchart example: Polar angle axis drawn inside the ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polar angle axis drawn inside the ring",
  summary: "On a donut-shaped rose, the angle axis normally sits outside the outer radius. axes.inside moves its line, ticks and labels into the hole when innerRadius is set.",
  section: "Option: Components",
  tags: ["axes.inside","orient: angle","innerRadius"],
  docs: [
    'repo/docs/assets/option/en/component/axis-common/base-axis.md',
    'repo/docs/assets/option/en/component/polar-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
