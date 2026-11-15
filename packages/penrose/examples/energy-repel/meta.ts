// penrose example: The repel objective, weight and all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The repel objective, weight and all',
  summary:
    'The docs\' `repel` returns `weight / (distance² + ε)`: huge when two circles are close, tiny when they are far. Three circles inside a fixed container are kept there by the contains constraint and pushed apart by `repel`; the weight is a frozen variable, so each pass uses a different one.',
  section: 'Writing Constraints & Objectives',
  tags: ['inverse', 'ops.vdistsq', 'add', 'mul', 'repel', 'objective', 'freeze'],
  docs: [
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/docs-site/docs/ref/optimization-api.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
