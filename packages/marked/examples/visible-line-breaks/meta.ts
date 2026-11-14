// marked example: Visible line breaks
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Visible line breaks",
  summary:
    "A short poem and an address, where each line break is marked with a faint return arrow. It overrides renderer.br together with the breaks option, so you can see exactly where Marked made breaks.",
  section: "Renderer",
  tags: ["renderer", "br", "breaks"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
