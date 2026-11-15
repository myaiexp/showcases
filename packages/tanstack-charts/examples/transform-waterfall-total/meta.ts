// tanstack-charts example: waterfall total row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "waterfall total row",
  summary:
    "total true appends one extra row of kind total that starts at zero and ends at the final level. It is a synthetic row with only derived fields, so the x channel has to name it. The checkbox adds or removes it.",
  section: "Data Transforms",
  tags: ["waterfall", "total", "barY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
