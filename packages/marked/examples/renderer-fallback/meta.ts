// marked example: Renderer fallback with false
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Renderer fallback with false",
  summary:
    "A contact list where phone and e-mail links get icon chips and the web link stays an ordinary link. The link override returns false for everything it does not handle, which sends it back to the built-in renderer.",
  section: "Renderer",
  tags: ["renderer", "link", "false", "fallback"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
