// tanstack-charts example: nice: true against a number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'nice: true against a number',
  summary:
    'nice rounds the resolved domain to tick-friendly ends. true uses the responsive or authored tick count, which also applies when the axis is hidden. A number such as 3 rounds with that count independent of the chart size, which keeps a small guide-free sparkline stable. The domain ends are in the readout.',
  section: 'Scales, Guides, and Color',
  tags: ['nice', 'scaleLinear', 'sparkline', 'axis false'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
