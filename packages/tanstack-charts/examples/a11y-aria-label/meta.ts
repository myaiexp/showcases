// tanstack-charts example: Naming the chart with ariaLabel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Naming the chart with ariaLabel',
  summary:
    'Every host requires ariaLabel. The SVG surface gets role img, a chart role description and the label as its accessible name. The readout shows those attributes as they are in the DOM, and editing the label updates them through host.update.',
  section: 'Accessibility',
  tags: ['ariaLabel', 'role', 'aria-roledescription', 'host.update'],
  docs: [
    'repo/docs/guides/accessibility.md',
    'repo/docs/reference/dom-host.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
