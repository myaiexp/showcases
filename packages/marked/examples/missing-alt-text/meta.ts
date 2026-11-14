// marked example: Find pictures without alt text
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Find pictures without alt text",
  summary:
    "Images with an empty description are outlined in red and listed in an accessibility check under the page. A walkTokens function inspects every image token and rewrites the bad ones.",
  section: "Walk tokens",
  tags: ["walkTokens","image","accessibility","alt"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
