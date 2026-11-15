// tanstack-charts example: Plain filter and map before a transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plain filter and map before a transform",
  summary:
    "Transforms have no pipeline protocol, so a step the library lacks is an ordinary array method. Orders are filtered to profitable ones and mapped to a net value before groupBy sums them per region. The select toggles the filter.",
  section: "Transforms and Reactivity",
  tags: ["groupBy", "Array.filter", "Array.map", "barY"],
  docs: ['repo/docs/guides/transforms-and-reactivity.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
