// tanstack-charts example: rank within each group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rank within each group",
  summary:
    "With by, rank restarts inside each group. Four teams have a score for each of six rounds; ranking by round turns scores into positions, and a line chart with an inverted-looking y axis draws the places each team holds round after round.",
  section: "Data Transforms",
  tags: ["rank", "by", "lineY", "dot"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
