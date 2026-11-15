// tanstack-charts example: Waterfall from rolling deltas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Waterfall from rolling deltas",
  summary:
    "waterfall does not derive contributions, so they are made visibly before it. rollingWindow with size 2 and the delta reducer turns yearly prices into year-over-year changes, and waterfall with a total turns those back into a bridge ending at the net change.",
  section: "Data Transforms",
  tags: ["waterfall", "rollingWindow", "delta", "barY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
