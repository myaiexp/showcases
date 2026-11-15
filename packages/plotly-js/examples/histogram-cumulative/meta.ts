// plotly-js example: Cumulative histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cumulative histogram',
  summary:
    'Bar counts turned into a running total with cumulative.enabled; direction and currentbin change how it accumulates.',
  section: 'Histograms',
  tags: ['histogram', 'cumulative.enabled', 'cumulative.direction', 'cumulative.currentbin'],
  docs: ['repo/_posts/plotly_js/statistical/histogram/2017-07-07-cumulative-histogram.html', 'repo/_data/plotschema.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
