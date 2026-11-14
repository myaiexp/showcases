// marked example: Emoticons and search highlights
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Emoticons and search highlights",
  summary:
    "A grocery chat where :) and <3 turn into emoji and the word you search for is highlighted in the text. It overrides renderer.text, which runs for every plain run of words, including the ones inside list items.",
  section: "Renderer",
  tags: ["renderer", "text", "emoji", "search"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
