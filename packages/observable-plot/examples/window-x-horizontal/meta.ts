// observable-plot example: Window: windowX smoothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: windowX smoothing',
  summary:
    'The mirror of windowY: windowX smooths x, here the global temperature anomaly plotted with year on the vertical axis.',
  section: 'Transform: Window',
  tags: ['windowX', 'lineX', 'k'],
  docs: ['repo/docs/transforms/window.md', 'repo/docs/data/hadcrut.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
