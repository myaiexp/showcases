// tanstack-charts example: rank tie handling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rank tie handling",
  summary:
    "rank orders rows by a value and adds a rank column; ties: competition leaves gaps after equal ranks, dense does not, and ordinal gives equal values distinct ranks in input order. Seven scores with ties are ranked three ways and the bars print each rank.",
  section: "Data Transforms",
  tags: ["rank", "ties", "competition", "dense", "ordinal", "barX"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
