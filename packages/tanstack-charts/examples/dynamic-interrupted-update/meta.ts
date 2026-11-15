// tanstack-charts example: Interrupting a transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interrupting a transition',
  summary:
    'An update that arrives in the middle of a transition starts from the geometry currently painted, not from the old or the new data. A slow tween here is retargeted every 400 ms, so the bars never reach a final value and still move smoothly.',
  section: 'Dynamic Data and Animation',
  tags: ['svgAnimation', 'interruption', 'host.update'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
