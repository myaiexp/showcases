// penrose example: The energy falling as the solve runs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The energy falling as the solve runs',
  summary:
    'Penrose turns every `ensure` and `encourage` into terms of one energy and minimizes it. `evalEnergy(state)` reads that energy; called after each step of the solve, it traces the curve in the corner while the boxes stack themselves (log scale).',
  section: 'Language API',
  tags: ['evalEnergy', 'step', 'ensure', 'encourage'],
  docs: [
    'repo/packages/core/src/index.ts',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
