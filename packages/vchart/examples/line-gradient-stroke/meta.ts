// vchart example: Line: gradient stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: gradient stroke',
  summary:
    'line.style.stroke takes a linear gradient whose stops can fade in opacity, so the line grows from transparent to solid. The marker points are hidden with point.visible false, and the data is replaced on a timer.',
  section: 'Line and Area',
  tags: ['line.style.stroke', 'gradient', 'stops', 'point.visible'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
