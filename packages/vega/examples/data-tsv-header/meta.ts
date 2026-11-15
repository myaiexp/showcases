// vega example: TSV with a header
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "TSV with a header",
  summary:
    "format tsv with header names the fields of tab-separated rows that have no header line; the points are plotted with labels.",
  section: "Data",
  tags: ["data.format.type", "data.format.header"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/transforms/filter.md",
    "repo/docs/docs/signals.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
