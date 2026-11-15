// vega example: View: Construction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Options Versus Method Chain',
  summary:
    'Two identical bar charts, one configured entirely through View constructor options and one through logLevel, renderer, initialize, hover, background and description calls chained on the instance.',
  section: 'View API',
  tags: ['view.options', 'view.initialize', 'view.hover', 'view.background', 'view.description'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/docs/api/parser.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
