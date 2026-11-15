// d2 example: Layers, scenarios and steps compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layers, scenarios and steps compared",
  summary:
    "The same two boards declared under each keyword, animated. Under layers each board starts blank; under scenarios each board adds to the root board; under steps board two also keeps board one's a -> b. This is the inheritance table on the composition page.",
  section: "Composition",
  tags: ["layers", "scenarios", "steps", "inheritance"],
  docs: [
    "repo/docs/tour/composition.md",
    "repo/docs/tour/layers.md",
    "repo/docs/tour/scenarios.md",
    "repo/docs/tour/steps.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
