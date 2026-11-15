// vega example: Description and usermeta
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Description and usermeta",
  summary:
    "A sliding sine wave with a description (the container's aria-label) and usermeta metadata Vega carries and ignores.",
  section: "Specification",
  tags: ["description", "usermeta"],
  docs: [
    "repo/docs/docs/specification.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/transforms/sequence.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
