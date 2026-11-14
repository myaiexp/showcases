// marked example: Table of contents
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Table of contents",
  summary:
    "A contents list appears above the page, built from the headings and linking to them. A walkTokens function collects the headings while Marked renders, and a heading renderer adds the ids.",
  section: "Walk tokens",
  tags: ["walkTokens","heading","renderer","slug"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
