// vchart example: Sequence: events and links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: events and links",
  summary:
    "A sequence chart built from a dot series (events on a time axis, one row per service) and a link series bound to it by dotSeriesIndex, joining events through their node_name. The time axis shows two label layers; the data is replaced every few seconds.",
  section: "Flow and Relation",
  tags: ["sequence", "dot", "link", "dotSeriesIndex", "fromField", "toField", "dotTypeField", "time axis"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sequence.md",
    "repo/docs/assets/option/en/chart/sequence.md",
    "repo/docs/assets/option/en/series/dot.md",
    "repo/docs/assets/option/en/series/link.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
