// g6 example: Concentric layout: sortBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Concentric layout: sortBy",
  summary: "sortBy decides which nodes sit in the middle: degree, or a value computed from the node data. A select switches between degree and a rank stored in the data, which puts the data root in the centre.",
  section: 'Layout',
  tags: ["concentric", "sortBy", "degree"],
  docs: [
    "repo/packages/site/docs/manual/layout/ConcentricLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
