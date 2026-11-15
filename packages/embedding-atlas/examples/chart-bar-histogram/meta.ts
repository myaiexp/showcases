// embedding-atlas example: the default bar histogram and its $filter layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Histogram with a crossfilter layer",
  summary:
    "A chart spec with two bar layers over the words column: a faded one counting every row and a second with filter: \"$filter\" counting only the rows the brush keeps. Each variant presets a brush through chartStates, so the count plot beside it narrows to the brushed documents.",
  section: "Charts",
  tags: ['layers', 'mark: bar', 'filter: $filter', 'encoding', 'aggregate: count', 'selection', 'chartStates', '$markColorFade'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/default_charts.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
