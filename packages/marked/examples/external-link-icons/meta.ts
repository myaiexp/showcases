// marked example: External link icons
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "External link icons",
  summary:
    "Links to other sites get a small ↗ and are marked to open in a new tab, while links within the page stay plain. It overrides renderer.link, writing target and rel itself, and returns false for the internal ones.",
  section: "Renderer",
  tags: ["renderer", "link", "false", "target", "rel"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
