// marked example: Colour swatches in code
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Colour swatches in code",
  summary:
    "A brand-colour list where every inline code value like #ff8800 shows a swatch of that colour, while other code stays plain. It overrides renderer.codespan and validates the value with a hex pattern first.",
  section: "Renderer",
  tags: ["renderer", "codespan", "false", "colour"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
