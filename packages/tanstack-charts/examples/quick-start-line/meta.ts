// tanstack-charts example: Monthly revenue line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Monthly revenue line',
  summary:
    'The quick start chart: a line through five months with points, a nice y axis with grid lines, and the built-in tooltip. The height slider sends new host options through host.update.',
  section: 'Quick Start',
  tags: ['defineChart', 'mountChart', 'lineY', 'scalePoint', 'scaleLinear', 'tooltip', 'host.update'],
  docs: ['repo/docs/quick-start.md', 'repo/docs/reference/dom-host.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
