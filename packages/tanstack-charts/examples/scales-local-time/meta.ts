// tanstack-charts example: Local time with d3 scaleTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Local time with d3 scaleTime',
  summary:
    'Hourly data over three days. A checkbox swaps the x axis between the compact UTC scale and d3 scaleTime (local day ticks) while y stays a compact linear scale.',
  section: 'Scales',
  tags: ['scaleTime', 'scaleUtc', 'nice'],
  docs: ['repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
