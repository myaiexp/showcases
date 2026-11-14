// vchart example: Line: sampling large data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: sampling large data',
  summary:
    'With thousands of points, sampling thins the line before it is drawn. A select picks lttb, min, max, sum or average, and a slider sets samplingFactor; the same 3000 values are redrawn each time.',
  section: 'Line and Area',
  tags: ['sampling', 'samplingFactor', 'lttb'],
  docs: [
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
