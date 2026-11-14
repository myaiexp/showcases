// vchart example: Sequence: highLightSeriesGroup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: highLightSeriesGroup",
  summary:
    "seriesGroupField puts event rows into groups and highLightSeriesGroup picks the group to emphasise: its grid rows get the grid.background fill while the other rows stay plain. The select (and the card, on a timer) switches the highlighted group.",
  section: "Flow and Relation",
  tags: ["highLightSeriesGroup", "seriesGroupField", "grid", "background"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sequence.md",
    "repo/docs/assets/option/en/chart/sequence.md",
    "repo/docs/assets/option/en/series/dot.md",
    "repo/docs/assets/option/en/series/link.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
