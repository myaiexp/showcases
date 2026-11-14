// observable-plot example: Olympian scatterplot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Olympian scatterplot',
  summary:
    'The first chart in What is Plot?: a dot mark maps the weight, height and sex columns of 11,000 athletes to x, y and stroke, and Plot infers the scales, axes and colour legend.',
  section: 'Introduction',
  tags: ['dot', 'stroke', 'color legend', 'scatterplot'],
  docs: ['repo/docs/what-is-plot.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
