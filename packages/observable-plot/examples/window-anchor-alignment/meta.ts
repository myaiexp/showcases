// observable-plot example: Window: anchor alignment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: anchor alignment',
  summary:
    'A 28-day rolling mean aligned to the start, middle or end of each window. End gives a trailing average.',
  section: 'Transform: Window',
  tags: ['windowY', 'lineY', 'anchor'],
  docs: ['repo/docs/transforms/window.md', 'repo/docs/data/sf-temperatures.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
