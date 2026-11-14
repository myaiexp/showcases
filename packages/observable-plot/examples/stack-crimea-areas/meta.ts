// observable-plot example: Stack: implicit versus explicit stackY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: implicit versus explicit stackY',
  summary:
    'A stacked area chart of Crimean War deaths by cause. areaY stacks implicitly; the toggle swaps in an explicit stackY, which draws the identical chart.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'ruleY'],
  docs: ['repo/docs/transforms/stack.md', 'repo/docs/data/crimea.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
