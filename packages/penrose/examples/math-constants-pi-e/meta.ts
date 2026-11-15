// penrose example: MathPI and MathE as lengths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MathPI and MathE as lengths',
  summary:
    'A circle of sampled size rolls out into a line of length `2 * MathPI * r` beneath it. That line is cut into diameters: three whole blue ones and a red leftover of `MathPI - 3` diameters. The bottom row does the same with `MathE` and unit bars: two whole bars and a leftover of `MathE - 2`.',
  section: 'Computation: Math',
  tags: ['MathPI', 'MathE', 'circle'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
