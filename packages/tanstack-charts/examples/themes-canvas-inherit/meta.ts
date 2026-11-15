// tanstack-charts example: Canvas paints in the container colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas paints in the container colors',
  summary:
    'A mark drawn on a canvas layer is not a DOM node, so CSS selectors cannot reach it. Its currentColor and var(--...) paints are resolved against the container and repainted when the container style changes. The area uses the third palette variable and the line currentColor.',
  section: 'Themes and Styling',
  tags: ['canvasChartRenderer', 'currentColor', 'CSS variables', 'Canvas'],
  docs: ['repo/docs/guides/themes-and-styling.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
