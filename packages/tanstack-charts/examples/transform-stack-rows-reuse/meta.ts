// tanstack-charts example: Reuse stack endpoints outside the mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reuse stack endpoints outside the mark",
  summary:
    "Because stackRowsY returns plain rows, the endpoints can feed more than one mark. Bars use y1 and y2, text labels sit at the middle of each segment, and a line follows the top of the whole stack, which a bar's own layout would not expose.",
  section: "Data Transforms",
  tags: ["stackRowsY", "barY", "text", "lineY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
