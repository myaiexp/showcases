// echarts example: Canvas and SVG renderers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas and SVG renderers',
  summary:
    'The same scatter option initialised once with renderer: "canvas" and once with renderer: "svg", reporting what each puts into the page as the point count grows.',
  section: 'Best Practices',
  tags: ['renderer', 'canvas', 'svg', 'echarts.init'],
  docs: ['repo/contents/en/best-practices/canvas-vs-svg.md', 'repo/en/api/echarts.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
