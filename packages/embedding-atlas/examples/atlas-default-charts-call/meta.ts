// embedding-atlas example: defaultCharts() specs fed back as charts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'defaultCharts() as a starting point',
  summary:
    'defaultCharts({ coordinator, table, id, projection, config }) returns the BuiltinChartSpec list Atlas would build: embedding, predicates, instances and one chart per column chosen by type. Here the list is printed, the count plots are capped to four bars, and the result goes back in through initialState.charts.',
  section: 'EmbeddingAtlas',
  tags: ['defaultCharts', 'BuiltinChartSpec', 'initialState', 'config'],
  docs: ['repo/packages/viewer/src/charts/default_charts.ts', 'repo/packages/viewer/src/api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
