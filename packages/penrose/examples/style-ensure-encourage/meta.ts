// penrose example: ensure and encourage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ensure is required, encourage is a wish',
  summary:
    'Two circles of radius 45. `ensure disjoint` is a constraint the layout must satisfy, `encourage near` is an objective it only tries to reach. Alone, the constraint leaves the pair anywhere apart; with a wish at distance 150 they settle there; the wish alone stacks them; and when the two disagree, the constraint wins and the circles stop 30 apart.',
  section: 'Style: Selector Blocks',
  tags: ['ensure', 'encourage', 'disjoint', 'near', 'constraint', 'objective'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
