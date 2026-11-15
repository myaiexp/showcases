// tanstack-charts example: Keyboard navigation over points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyboard navigation over points',
  summary:
    'Chart-owned focus works from the keyboard. Tab to the chart, then the arrow keys, Home and End move focus between points and the readout shows the same typed point a pointer would produce. In the card, arrow key events are sent to the chart to show the same traversal.',
  section: 'Accessibility',
  tags: ['keyboard', 'onFocusChange', 'ChartPoint', 'tabIndex'],
  docs: [
    'repo/docs/guides/accessibility.md',
    'repo/docs/reference/dom-host.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
