// penrose example: A 2D objective and the path of its iterate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A 2D objective and the path of its iterate',
  summary:
    'Two variables, one objective with a curved valley, and a heat map of its energy drawn from the same expression. Each tick of `run({ until })` moves the iterate; the dashed path shows how it follows the valley floor to the minimum at (1, 1). Every pass starts from a different point through the `vals` config.',
  section: 'Optimization API',
  tags: ['variable', 'problem', 'objective', 'run', 'until', 'vals', 'squared'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
