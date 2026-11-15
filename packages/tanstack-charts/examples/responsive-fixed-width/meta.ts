// tanstack-charts example: A fixed width opts out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A fixed width opts out',
  summary:
    'Two charts from the same definition in boxes that change width. The left one follows its box and re-lays out. The right one is given width: 240, so its scene is laid out once at 240 pixels and the SVG is then scaled as a single picture, text and strokes included. Fixed width is for export frames and benchmarks, not normal layouts.',
  section: 'Responsive Charts',
  tags: ['mountChart', 'width', 'height'],
  docs: [
    'repo/docs/guides/responsive-charts.md',
    'repo/docs/reference/dom-host.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
