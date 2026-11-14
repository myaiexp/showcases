// vchart example: Partial stroke: a stroke array on an arc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partial stroke: a stroke array on an arc",
  summary:
    "An arc mark's stroke can be an array of [outer arc, end edge, inner arc, start edge], so each side of a ring segment gets its own colour or none. The sweep angle of the arcs breathes in the preview.",
  section: "Option: Marks and Graphics",
  tags: ["stroke array","lineWidth","arc","innerRadius","outerRadius"],
  docs: [
    'repo/docs/assets/option/en/graphic/partial-stroke-style.md',
    'repo/docs/assets/option/en/graphic/stroke-style.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
