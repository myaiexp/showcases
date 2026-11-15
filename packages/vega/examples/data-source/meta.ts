// vega example: Source: single and merged
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Source: single and merged",
  summary:
    "data.source derives a set from one named set or unions several; two sources grow and the merged and filtered sets follow.",
  section: "Data",
  tags: ["data.source", "data.transform"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/api/view.md",
    "repo/docs/docs/transforms/filter.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
