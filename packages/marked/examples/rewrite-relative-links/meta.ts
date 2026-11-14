// marked example: Rewrite relative links
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Rewrite relative links",
  summary:
    "Links and images written as short paths like guide/install.md are resolved against a base address, and absolute, mail and in-page links are left alone. A walkTokens function edits the href of each link and image token.",
  section: "Walk tokens",
  tags: ["walkTokens","link","image","href"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
