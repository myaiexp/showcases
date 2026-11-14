// observable-plot example: Window: strict windows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: strict windows',
  summary:
    'With strict on, points whose window would be truncated are left out; with it off, the average uses whatever neighbours exist.',
  section: 'Transform: Window',
  tags: ['windowY', 'lineY', 'strict'],
  docs: ['repo/docs/transforms/window.md', 'repo/docs/data/sf-temperatures.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
