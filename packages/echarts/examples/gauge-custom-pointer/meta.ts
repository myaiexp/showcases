// echarts example: Gauge custom pointer and anchor icons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gauge custom pointer and anchor icons',
  summary:
    'Replace the gauge needle with a built-in icon or an SVG path, and the hub with another shape. Switch pointer.icon, anchor.icon, keepAspect and showAbove while the needle moves.',
  section: 'Option: series.gauge',
  tags: ['gauge', 'pointer.icon', 'anchor.icon', 'keepAspect', 'showAbove', 'offsetCenter', 'path://'],
  docs: ['repo/en/option/series/gauge.md', 'repo/en/option/partial/icon.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
