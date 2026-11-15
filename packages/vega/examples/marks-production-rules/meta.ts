// vega example: Production Rules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Production Rules",
  summary:
    "Bars take their fill from a rule chain: above the high threshold red, below the low one blue, otherwise grey. Move the two thresholds and the colours re-sort.",
  section: "Marks",
  tags: ['marks.encode.fill','production-rule','value.test'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
