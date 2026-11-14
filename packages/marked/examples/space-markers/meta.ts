// marked example: Blank line markers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Blank line markers",
  summary:
    "A song with one blank line between some verses and three between others, showing a labelled gap wherever blank lines were, since Marked normally treats them all alike. It overrides renderer.space.",
  section: "Renderer",
  tags: ["renderer", "space", "blank lines"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
