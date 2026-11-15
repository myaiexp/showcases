// penrose example: equal: making two values meet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "equal: making two values meet",
  summary:
    'The orange circle is fixed; the blue one has a free radius and height. `encourage equal(a.icon.r, b.icon.r)` matches the radii, and `equal(a.icon.center[1], b.icon.center[1])` lines the centres up at the same height. It minimises (x - y)^2, a soft pull rather than a hard rule.',
  section: "Objective Functions",
  tags: ['equal', 'encourage', 'objective', 'comparison sugar'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
