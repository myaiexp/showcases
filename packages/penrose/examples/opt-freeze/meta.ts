// penrose example: freeze holds one variable still
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'freeze holds one variable still',
  summary:
    'The `freeze` function in `start({ freeze })` takes a variable and says whether the optimizer may move it. Frozen, y keeps the value `vals` gave it, so the point slides along a line to the spot under its target. The Run\'s `vals` leaves frozen variables out, so the example remembers them itself.',
  section: 'Optimization API',
  tags: ['freeze', 'vals', 'start', 'run', 'variable'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
