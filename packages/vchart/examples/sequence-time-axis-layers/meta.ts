// vchart example: Sequence: time axis layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: time axis layers",
  summary:
    "The sequence chart's time axis shows two label layers: layers[0] is the parent axis and layers[1] the child, each with its own tickStep (milliseconds here) and timeFormat. The select swaps between tick densities and formats; the axis range pins the visible window.",
  section: "Flow and Relation",
  tags: ["axes", "time", "layers", "tickStep", "timeFormat", "range"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sequence.md",
    "repo/docs/assets/option/en/chart/sequence.md",
    "repo/docs/assets/option/en/series/dot.md",
    "repo/docs/assets/option/en/series/link.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
