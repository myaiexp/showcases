// echarts example: Media query responsive layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Media query responsive layout',
  summary:
    'One option with a baseOption and media rules: drag the container width and the legend and two pies switch between a wide and a narrow layout, like a CSS media query.',
  section: 'Concepts',
  tags: ['baseOption', 'media', 'query', 'maxWidth', 'legend.orient', 'radius', 'center'],
  docs: ['repo/en/tutorial/media-query.md', 'repo/en/option/component/legend.md', 'repo/en/option/series/pie.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
