// penrose example: lessThan: a soft upper bound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "lessThan: a soft upper bound",
  summary:
    'The blue circle is pulled towards x = 200. `encourage lessThan(a.icon.center[0], 0)` asks for its x coordinate to be less than or equal to the grey line, but it is only an objective: the two forces compromise, and the circle stops about halfway. Use `ensure` for a hard limit.',
  section: "Objective Functions",
  tags: ['lessThan', 'encourage', 'objective', 'nearPt', 'comparison sugar'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
