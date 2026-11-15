// penrose example: lengthK and perimeter as objectives
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'lengthK and perimeter as objectives',
  summary:
    '`lengthK(points, closed, k)` sums every segment length raised to `k`; with `k = 1` it is the `perimeter`. Five free points sit between two pinned ends. With no objective they stay scattered, with `minimal(lengthK(…, 1))` they come into line but stay uneven, and with `k = 2` they also space out evenly, since equal steps make the squared lengths smallest.',
  section: 'Computation: Curve Measures',
  tags: ['lengthK', 'perimeter', 'minimal'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
