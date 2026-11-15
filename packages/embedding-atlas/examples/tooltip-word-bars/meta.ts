// embedding-atlas example: a custom tooltip that draws a small SVG bar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip with a chart',
  summary:
    'A custom tooltip can hold anything the DOM can: this one draws an SVG bar chart counting how many of the hovered point\'s words come from each topic\'s vocabulary, in the default category colours.',
  section: 'Custom Tooltip',
  tags: ['customTooltip', 'defaultCategoryColors', 'DataPoint'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
    'repo/packages/component/src/lib/index.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
