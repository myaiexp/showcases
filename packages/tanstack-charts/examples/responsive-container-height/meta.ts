// tanstack-charts example: Height from the container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Height from the container',
  summary:
    'With neither height nor aspectRatio the chart follows the box CSS height. The box height changes while the chart stays in step with it. The box has a definite height of its own, so the chart is never its own resize input.',
  section: 'Responsive Charts',
  tags: ['mountChart', 'ResizeObserver', 'height'],
  docs: [
    'repo/docs/guides/responsive-charts.md',
    'repo/docs/reference/dom-host.md',
    'repo/docs/concepts/marks-and-layering.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
