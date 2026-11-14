// marked example: Links across streamed chunks
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Links across streamed chunks",
  summary:
    "A link in a second message resolves to a definition sent in the first, like a chat reply that arrives in pieces. processAllTokens saves the links map and provideLexer gives it to the next chunk's lexer.",
  section: "Hooks",
  tags: ["hooks", "processAllTokens", "provideLexer", "Lexer", "reference links"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts", "repo/src/Lexer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
