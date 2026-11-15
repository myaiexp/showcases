// penrose example: greaterThan: a soft lower bound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "greaterThan: a soft lower bound",
  summary:
    'The blue circle is pulled towards x = -200. `encourage greaterThan(a.icon.center[0], 0)` asks for its x coordinate to be greater than or equal to the grey line, but it is only an objective: the two forces compromise, and the circle stops about halfway. Use `ensure` for a hard limit.',
  section: "Objective Functions",
  tags: ['greaterThan', 'encourage', 'objective', 'nearPt', 'comparison sugar'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
