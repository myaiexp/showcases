// marked example: Import another page
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Import another page",
  summary:
    "Lines like :https://notes.test/packing: are replaced by the page they point to, once it has been fetched. A custom block extension holds the address and an async walkTokens fills in the content; a missing page shows an error note.",
  section: "Async",
  tags: ["async", "extensions", "walkTokens", "importUrl"],
  docs: ["repo/docs/USING_PRO.md"],
  provenance: "pure",
  added: "2026-11-14",
});
