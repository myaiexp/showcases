// embedding-atlas example: choosing default charts with defaultChartsConfig
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choosing the default charts',
  summary:
    'With no initialState, Atlas draws one chart per column. defaultChartsConfig narrows that: include keeps listed columns, exclude drops them, override swaps a column\'s chart for your spec (or null to skip it), and table / embedding set to false remove the instances table or the embedding view. The select steps through six configs.',
  section: 'EmbeddingAtlas',
  tags: ['defaultChartsConfig', 'include', 'exclude', 'override', 'table', 'embedding'],
  docs: ['repo/packages/viewer/src/charts/default_charts.ts', 'repo/packages/viewer/src/api.ts', 'repo/packages/viewer/src/charts/instances/types.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
