// tanstack-charts example: rollingWindow anchor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rollingWindow anchor",
  summary:
    "anchor says where the current row sits in its window: at the end (a trailing average), the middle (centred) or the start (looking ahead). A noisy series is smoothed with the same size three ways and the thick line shows the lag or lead each choice produces.",
  section: "Data Transforms",
  tags: ["rollingWindow", "anchor", "mean", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
