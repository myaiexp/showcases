// embedding-atlas example: stdev, variance and product aggregates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spread aggregates: stdev and variance",
  summary:
    "Bars of the rating column per topic, drawn with the aggregates that measure spread: stdev, stdevp (population), variance and variancep. A final variant shows distinct, counting the sources inside each topic.",
  section: "Charts",
  tags: ['aggregate', 'stdev', 'stdevp', 'variance', 'variancep', 'distinct'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
