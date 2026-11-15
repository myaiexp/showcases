// tanstack-charts example: Width follows the container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Width follows the container',
  summary:
    'A line chart mounted without a width. The box around it changes width and the chart re-lays out each time: ticks, margins and the line all follow the measured content width. The readout shows the width the scene was built for.',
  section: 'Responsive Charts',
  tags: ['mountChart', 'height', 'ResizeObserver', 'onRender'],
  docs: [
    'repo/docs/guides/responsive-charts.md',
    'repo/docs/reference/dom-host.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
