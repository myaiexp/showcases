// penrose example: maximal: pushing a value up as far as it goes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "maximal: pushing a value up as far as it goes",
  summary:
    'The opposite of `minimal`. `encourage maximal(a.icon.center[0])` sends the circle to the right edge, `maximal(a.icon.center[1])` to the top, and `maximal(a.icon.r)` grows it to its upper bound.',
  section: "Objective Functions",
  tags: ['maximal', 'encourage', 'objective'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
