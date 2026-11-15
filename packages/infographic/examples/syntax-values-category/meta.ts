// AntV Infographic example: Syntax: grouped values with category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: grouped values with category',
  summary:
    'The syntax page groups values with a category field. The docs name chart-column-grouped-simple for this, but 0.2.20 has no such template, so the chart here is chart-column-simple, which draws every value and ignores the category. The side panel shows the parsed values with their categories.',
  section: 'Infographic syntax',
  tags: ['values', 'category', 'chart-column-simple', 'getOptions'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
