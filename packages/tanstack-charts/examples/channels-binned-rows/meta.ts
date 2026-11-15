// tanstack-charts example: Derived rows from binX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Derived rows from binX',
  summary:
    'A histogram built by running binX on raw latencies before the rect mark. The slider changes the threshold count; the transform runs beside the definition.',
  section: 'Data and Channels',
  tags: ['binX', 'rect', 'thresholds'],
  docs: ['repo/docs/concepts/data-and-channels.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
