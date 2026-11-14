// deck-gl example: CPUAggregator histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "CPUAggregator histogram",
  summary:
    "The Aggregator interface used without a layer: bin weights by longitude, then read the bins back.",
  section: 'Aggregation layers',
  tags: ["CPUAggregator","Aggregator","setProps","update","getBin","getResultDomain","customOperations"],
  docs: ["repo/docs/api-reference/aggregation-layers/cpu-aggregator.md","repo/docs/api-reference/aggregation-layers/aggregator.md","repo/docs/api-reference/aggregation-layers/overview.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
