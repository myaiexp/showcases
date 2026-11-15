// tanstack-charts example: Gradient on a line stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient on a line stroke',
  summary:
    'Gradients work for strokes as well as fills. A vertical gradient is mapped across the bounding box of the line, so low values are painted blue and high values orange. Default coordinates run from the bottom (0, 1) to the top (0, 0).',
  section: 'Themes and Styling',
  tags: ['gradients', 'stroke', 'url(#id)', 'ChartLinearGradient'],
  docs: ['repo/docs/guides/themes-and-styling.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
