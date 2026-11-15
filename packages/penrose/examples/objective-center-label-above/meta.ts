// penrose example: centerLabelAbove: a label over the middle of a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "centerLabelAbove: a label over the middle of a line",
  summary:
    'The label\'s position is free, so it lands wherever it was sampled. `encourage centerLabelAbove(a.icon, b.icon, 1)` moves the Text above the midpoint of the line, about one and a tenth text heights up; the last argument weights the objective.',
  section: "Objective Functions",
  tags: ['centerLabelAbove', 'encourage', 'objective', 'Text', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
