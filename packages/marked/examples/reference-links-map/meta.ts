// marked example: The links map
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "The links map",
  summary:
    "Reference-style links such as [pool][] read their address from a [pool]: line further down. The lexer collects those lines in a links map next to the tokens, listed live under the page.",
  section: "Lexer and parser",
  tags: ["marked.lexer", "links", "reference links", "def"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Lexer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
