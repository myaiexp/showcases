// marked example: Raw HTML shown as text
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Raw HTML shown as text",
  summary:
    "A comment containing HTML tags, rendered twice: by default the tags take effect, with an html override they appear as visible text. Handy for comment boxes where nobody should format the page.",
  section: "Renderer",
  tags: ["renderer", "html", "escape", "block"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
