// marked example: Italics as glossary terms
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Italics as glossary terms",
  summary:
    "A recipe where italic words found in a small glossary become dotted-underline terms with a hover definition, while other italics stay italic. It overrides renderer.em and returns false for the rest.",
  section: "Renderer",
  tags: ["renderer", "em", "false", "glossary"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
