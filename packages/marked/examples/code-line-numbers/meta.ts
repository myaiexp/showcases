// marked example: Code with line numbers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Code with line numbers",
  summary:
    "A fenced code block rendered twice: plain, and with a language badge and a number beside each line, as in a documentation site. It overrides renderer.code, which receives the text and the language.",
  section: "Renderer",
  tags: ["renderer", "code", "lang", "line numbers"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
