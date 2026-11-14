// marked example: Notification preview text
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Notification preview text",
  summary:
    "A chat message turned into the one-line plain text a phone notification shows: no tags, no symbols, cut at 60 characters. A provideParser hook swaps the HTML parser for one using TextRenderer.",
  section: "Hooks",
  tags: ["hooks", "provideParser", "Parser", "TextRenderer"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts", "repo/src/Parser.ts", "repo/src/TextRenderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
