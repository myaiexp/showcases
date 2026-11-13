// mermaid example: Gantt excluded days, axis format and ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gantt excluded days, axis format and ticks',
  summary:
    'Excluded weekends stretch tasks across the gap, `weekend friday` moves the weekend, and `axisFormat` with `tickInterval` shape the time axis. Compact display mode packs tasks into shared rows.',
  section: 'Gantt',
  tags: ['gantt', 'excludes', 'weekend', 'axisFormat', 'tickInterval', 'displayMode', 'todayMarker'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gantt.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
