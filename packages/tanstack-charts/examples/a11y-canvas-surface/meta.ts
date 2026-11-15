// tanstack-charts example: Canvas layers stay out of the accessibility tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas layers stay out of the accessibility tree',
  summary:
    'When a mark is drawn on a canvas layer, the chart root keeps the image role, the name, the description and the tab stop, and every canvas element is marked aria-hidden. The readout lists the elements of the mounted chart so you can see that only the root is exposed, and the toggle compares it with plain SVG.',
  section: 'Accessibility',
  tags: ['canvasChartRenderer', 'ariaLabel', 'ariaDescription', 'aria-hidden'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/reference/dom-host.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
